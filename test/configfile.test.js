"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configure_1 = require("../src/configure");
const ava_1 = __importDefault(require("ava"));
const app_state_1 = require("./fixtures/app.state");
const path_1 = require("path");
const test = ava_1.default;
test.beforeEach((t) => {
    t.context.appState = app_state_1.createAppState();
    t.context.configFilename = path_1.resolve(__dirname, "../src/configure.template.ts");
});
test("can reload valid configuration file", async (t) => {
    const { appState, configFilename } = t.context;
    await configure_1.reload({
        appState,
        configFilename,
        log: () => { },
    });
    t.truthy(Object.values(appState.jobs).length, "jobs instantiated");
    t.truthy(appState.jobs["my-api-status"].state.status, "job has a status");
});
//# sourceMappingURL=configfile.test.js.map