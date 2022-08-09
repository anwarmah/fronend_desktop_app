"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAppState = void 0;
const app_actions_1 = require("../../src/app.actions");
exports.createAppState = () => {
    const appState = {
        actions: {},
        jobs: {},
        iconTheme: "stencil_dark",
        state: "OK",
    };
    appState.actions = app_actions_1.create({
        log: () => { },
        electron: {},
        menubar: {},
        appState,
    });
    return appState;
};
//# sourceMappingURL=app.state.js.map