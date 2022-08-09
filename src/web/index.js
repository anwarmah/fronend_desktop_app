"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./global.scss");
require("./icons.min.css");
const Checkup_1 = require("./components/Checkup");
const bluebird_1 = require("bluebird");
const messages_1 = require("../messages");
const preact_1 = require("preact");
const { ipcRenderer, remote } = window.require("electron");
const log = (log) => ipcRenderer.send("bus", messages_1.FromUi.LOG, {
    processName: "renderer",
    ...log,
});
// @debug - loud log mode
// setInterval(() => log({ level: "info", message: "get loud! "}), 20)
const onConfigure = () => ipcRenderer.send("bus", messages_1.FromUi.REQUEST_OPEN_CONFIG_FOLDER);
const onIssue = () => {
    window
        .require("electron")
        .ipcRenderer.send("bus", messages_1.FromUi.REQUEST_OPEN_ISSUE_URL);
};
const onOpenLog = () => {
    window
        .require("electron")
        .ipcRenderer.send("bus", messages_1.FromUi.REQUEST_OPEN_LOG_FILE);
};
const onToggleTheme = (theme) => {
    window
        .require("electron")
        .ipcRenderer.send("bus", messages_1.FromUi.REQUEST_SET_THEME, theme);
};
const onSnooze = (jobName) => window
    .require("electron")
    .ipcRenderer.send("bus", messages_1.FromUi.TOGGLE_SNOOZE_JOB, { jobName });
const refreshMainState = () => {
    const conf = remote.require("./configure");
    const nextState = JSON.parse(conf.getJsonState());
    if (!nextState) {
        return bluebird_1.delay(100).then(refreshMainState);
    }
    state.main = nextState;
    if (state.main) {
        for (const job of Object.values(state.main.jobs)) {
            if (!job || !job.name) {
                return log({ level: "error", message: "unable to extract job" });
            }
        }
    }
    render();
};
ipcRenderer.on("bus", (_, msg) => {
    log({ level: "verbose", message: `received ${msg}` });
    switch (msg) {
        case messages_1.FromServer.STATE_UPDATED:
            return refreshMainState();
        default:
            throw new Error(`unsupported msg: ${msg}`);
    }
});
const state = {
    main: null,
};
const render = () => preact_1.render(preact_1.h(Checkup_1.Checkup, { onConfigure: onConfigure, onSnooze: onSnooze, onIssue: onIssue, onOpenLog: onOpenLog, onToggleTheme: onToggleTheme, state: state }), document.getElementById("app"));
refreshMainState();
//# sourceMappingURL=index.js.map