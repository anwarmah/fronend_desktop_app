"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const menubar_1 = require("./menubar");
const configure_1 = require("./configure");
const app_actions_1 = require("./app.actions");
const messages_1 = require("./messages");
const logger_1 = require("./logger");
const moment = require("moment");
const pkg = require("../package.json");
const processLog = logger_1.createLogger({
    dirname: configure_1.getConfigDir(),
});
const log = (log) => processLog({ ...log, processName: "main" });
electron_1.app.on("ready", async () => {
    // @warn `import electron ...` init's some powerModule
    // which crashes if done before `'ready'`
    log({ level: "info", message: "app ready" });
    const electron = require("electron");
    await configure_1.upsertConfigDir();
    log({ level: "verbose", message: "config directory created" });
    const appState = {
        actions: {},
        state: "OK",
        iconTheme: electron_1.nativeTheme.shouldUseDarkColors ? "stencil_dark" : "stencil",
        jobs: {},
    };
    const mb = menubar_1.create({ appState, electron });
    appState.actions = app_actions_1.create({
        log,
        appState,
        electron,
        menubar: mb,
    });
    ["after-hide", "after-show", "open"].map((eventName) => {
        log({ level: "verbose", message: `event "${eventName}" triggered` });
        mb.on(eventName, () => reloadConfig(appState));
    });
    const snoozeJob = (jobName) => {
        const job = appState.jobs[jobName];
        if (!job)
            return log({ level: "warn", message: "job not found to snooze" });
        if (job.state.status === "snoozed") {
            // purge job, reload it. lazy/hacky way to de-snooze
            delete appState.jobs[jobName];
            return reloadConfig(appState);
        }
        else {
            job.state.status = "snoozed";
            job.state.snoozedUntilIsoStr = moment().add(24, "hours").toISOString();
        }
        job.state.message = "";
        appState.actions.onStateUpdated();
    };
    reloadConfig(appState);
    electron_1.ipcMain.on("bus", (_, msg, payload) => {
        switch (msg) {
            case messages_1.FromUi.REQUEST_OPEN_CONFIG_FOLDER:
                return configure_1.edit(electron);
            case messages_1.FromUi.REQUEST_OPEN_LOG_FILE:
                return configure_1.openLogFile(electron);
            case messages_1.FromUi.LOG:
                return processLog(payload);
            case messages_1.FromUi.REQUEST_OPEN_ISSUE_URL:
                return electron_1.shell.openExternal(pkg.bugs);
            case messages_1.FromUi.REQUEST_SET_THEME:
                return configure_1.setTheme(payload);
            case messages_1.FromUi.TOGGLE_SNOOZE_JOB:
                return snoozeJob(payload.jobName);
            default:
                throw new Error(`unsupported message from ui: ${msg}`);
        }
    });
});
const reloadConfig = (appState) => configure_1.debouncedReload({ appState, configFilename: configure_1.getConfigFilename(), log })
    .then(() => {
    appState.state = "OK";
    appState.errorMessage = "";
})
    .catch((err) => {
    log({ level: "error", message: err.message });
    appState.state = "BAD_CONFIG_FILE";
    appState.errorMessage = err.message;
})
    .then(() => appState.actions.onStateUpdated());
//# sourceMappingURL=bin.js.map