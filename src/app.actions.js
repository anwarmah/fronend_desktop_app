"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const messages_1 = require("./messages");
const menubar_1 = require("./menubar");
exports.create = ({ electron, log, menubar: mb, appState, }) => {
    const getWindow = () => mb._browserWindow;
    return {
        onStateUpdated: () => {
            // @warn - skip in tests. electron things are missing
            if (process.env.NODE_ENV === "test")
                return;
            const jobStatuses = Object.values(appState.jobs).map((job) => job.state.status);
            const trayStatus = appState.state === "BAD_CONFIG_FILE"
                ? "not_ok"
                : !jobStatuses.length
                    ? "pending"
                    : jobStatuses.some((status) => status === "not_ok")
                        ? "not_ok"
                        : jobStatuses.some((status) => status === "pending")
                            ? "pending"
                            : "ok";
            menubar_1.setTrayImage({
                electron,
                iconTheme: appState.iconTheme,
                mb,
                status: trayStatus,
            });
            const window = getWindow();
            if (!window) {
                log({
                    level: "warn",
                    message: "window not found. skipping sending state update",
                });
                return;
            }
            return window.webContents.send("bus", messages_1.FromServer.STATE_UPDATED);
        },
    };
};
//# sourceMappingURL=app.actions.js.map