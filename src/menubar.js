"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.setTrayImage = exports.rotateStatusIcon = exports.getStatusIcon = void 0;
const menubar_1 = require("menubar");
const env_1 = require("./env");
const path_1 = require("path");
exports.getStatusIcon = (nativeImage, iconTheme = "stencil_dark", status, degrees) => {
    const iconFilename = path_1.resolve(...[
        __dirname,
        "..",
        "assets",
        "iconTheme",
        iconTheme,
        "status",
        degrees ? status : "",
        `${status}${degrees ? "_" + degrees.toString() : ""}.png`,
    ].filter((i) => i));
    return nativeImage
        .createFromPath(iconFilename)
        .resize({ width: 16, height: 16 });
};
let rotateIconTimer = null;
exports.rotateStatusIcon = ({ electron, degrees, iconTheme, mb, status, }) => setTimeout(() => {
    const img = exports.getStatusIcon(electron.nativeImage, iconTheme, status, degrees);
    mb.tray.setImage(img);
    const nextDegrees = degrees === 110 ? 0 : degrees + 10;
    if (!rotateIconTimer)
        return;
    rotateIconTimer = exports.rotateStatusIcon({
        electron,
        degrees: nextDegrees,
        iconTheme,
        mb,
        status,
    });
}, 100);
/**
 * all tray updates *must* use this function, and never directly
 * call mb.tray.setImage.  otherwise, icon animation will compete with
 * other callers.
 */
exports.setTrayImage = ({ electron, iconTheme, status, mb, }) => {
    const img = exports.getStatusIcon(electron.nativeImage, iconTheme, status);
    if (status === "pending") {
        if (rotateIconTimer)
            return;
        if (iconTheme === "stencil_dark" || iconTheme === "stencil") {
            mb.tray.setImage(img);
            return (rotateIconTimer = exports.rotateStatusIcon({
                electron,
                iconTheme,
                mb,
                degrees: 0,
                status,
            }));
        }
        // fall through iff pending status has no supporting animation sprite kit!
    }
    clearTimeout(rotateIconTimer);
    rotateIconTimer = null;
    mb.tray.setImage(img);
};
function create({ appState, electron, }) {
    const icon = exports.getStatusIcon(electron.nativeImage, appState.iconTheme, "ok");
    const dir = path_1.dirname(env_1.prodWebIndex);
    const mb = menubar_1.menubar({
        browserWindow: {
            darkTheme: true,
            frame: env_1.isDev,
            show: env_1.isDev,
            transparent: false,
            width: env_1.isDev ? 1000 : 450,
            height: env_1.isDev ? 1000 : 400,
            y: 24,
            webPreferences: {
                devTools: env_1.isDev,
                nodeIntegration: true,
            },
        },
        dir,
        icon,
        preloadWindow: env_1.isDev,
    });
    mb.on("ready", () => {
        env_1.isDev && mb._browserWindow.openDevTools();
    });
    return mb;
}
exports.create = create;
//# sourceMappingURL=menubar.js.map