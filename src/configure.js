"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setTheme = exports.debouncedReload = exports.reload = exports.getJsonState = exports.getState = exports.openLogFile = exports.edit = exports.upsertConfigDir = exports.getConfigFilename = exports.getConfigTempleateFilename = exports.getConfigDir = void 0;
const fs_extra_1 = require("fs-extra");
const path_1 = __importStar(require("path"));
const lodash_1 = require("lodash");
const util_1 = require("util");
const primitivify_1 = __importDefault(require("primitivify"));
const electron_settings_1 = __importDefault(require("electron-settings"));
const jobs_1 = require("./jobs");
const applicationConfigPath = require("application-config-path");
exports.getConfigDir = () => applicationConfigPath("checkup");
exports.getConfigTempleateFilename = () => path_1.resolve(__dirname, "configure.template.js");
exports.getConfigFilename = () => path_1.resolve(exports.getConfigDir(), "config.js");
exports.upsertConfigDir = async () => {
    const configDirname = exports.getConfigDir();
    await fs_extra_1.mkdirp(configDirname);
    const templateFilename = path_1.resolve(__dirname, "configure.template.js");
    await fs_extra_1.lstat(exports.getConfigFilename()).catch(async (err) => {
        if (err.code === "ENOENT") {
            await fs_extra_1.copyFile(templateFilename, exports.getConfigFilename());
        }
    });
    return configDirname;
};
exports.edit = (electron) => electron.shell.showItemInFolder(exports.getConfigFilename());
exports.openLogFile = async (electron) => {
    const files = await util_1.promisify(fs_extra_1.readdir)(exports.getConfigDir());
    const lastLogFile = files
        .sort()
        .reverse()
        .find((f) => /^checkup.log.[^(gz)]*$/.test(f));
    if (!lastLogFile) {
        throw new Error("Could not find log files");
    }
    electron.shell.showItemInFolder(path_1.default.join(exports.getConfigDir(), lastLogFile));
};
let dangerousAppStateRef = null;
exports.getState = () => dangerousAppStateRef;
exports.getJsonState = () => JSON.stringify(primitivify_1.default(exports.getState(), (v) => (v instanceof Date ? v.toISOString() : v)));
exports.reload = ({ appState, configFilename, log, }) => {
    dangerousAppStateRef = appState; // look away. this is for easy/hacky renderer/main io
    // const res = compile([configFilename], {
    //   noEmitOnError: true,
    //   noImplicitAny: false,
    //   sourceMap: isDev,
    //   esModuleInterop: true,
    //   target: ts.ScriptTarget.ES5,
    //   module: ts.ModuleKind.CommonJS,
    // })
    // if (res.length) throw new Error(res.join('\n'))
    return jobs_1.rectify({ appState, configFilename, log });
};
exports.debouncedReload = lodash_1.debounce(exports.reload, 1000, {
    leading: true,
    maxWait: 5000,
});
exports.setTheme = (theme) => {
    electron_settings_1.default.set("theme", theme);
};
//# sourceMappingURL=configure.js.map