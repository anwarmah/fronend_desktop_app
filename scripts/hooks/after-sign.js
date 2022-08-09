"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// See: https://medium.com/@TwitterArchiveEraser/notarize-electron-apps-7a5f988406db
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const electron_notarize_1 = require("electron-notarize");
const pkg = require("../../package.json");
module.exports = async function maybeNotarize(params) {
    if (process.env.NODE_ENV === "development") {
        return console.warn("skipping notarization, NODE_ENV=development");
    }
    if (process.platform !== "darwin") {
        return console.warn("skipping notarization, not OSX Darwin");
    }
    console.log("afterSign hook triggered", params);
    const appBundleId = pkg.build.appId;
    if (!appBundleId)
        throw new Error("no appBundleId found in package.json");
    const appPath = path_1.default.join(params.appOutDir, `${params.packager.appInfo.productFilename}.app`);
    if (!fs_1.default.existsSync(appPath)) {
        throw new Error(`Cannot find application at: ${appPath}`);
    }
    console.log(`Notarizing ${appBundleId} found at ${appPath}`);
    const appleId = process.env.AID;
    if (!appleId)
        throw new Error("no appleid found");
    const appleIdPassword = process.env.AIP;
    if (!appleIdPassword)
        throw new Error("no appleIdPassword found");
    await electron_notarize_1.notarize({
        appBundleId,
        appPath,
        appleId,
        appleIdPassword,
    }).catch((err) => {
        console.error(`failed to notarize: ${err ? err.message : "NO ERROR MESSAGE FOUND"}`);
        throw err;
    });
    console.log(`Done notarizing ${appBundleId}`);
};
//# sourceMappingURL=after-sign.js.map