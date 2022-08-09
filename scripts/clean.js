"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const glob_1 = __importDefault(require("glob"));
const rimraf_1 = __importDefault(require("rimraf"));
const path_1 = __importDefault(require("path"));
const util_1 = require("util");
const rm = util_1.promisify(rimraf_1.default);
const glb = util_1.promisify(glob_1.default);
(async () => {
    try {
        const globs = await Promise.all([
            ".cache",
            "dist",
            "dist_web",
            "{scripts,src,test}/**/*.{js,js.map}",
        ].map((p) => glb(path_1.default.resolve(__dirname, "..", p))));
        const removed = await Promise.all(globs
            .flat()
            .reduce((memo, p) => p.includes("configure.template.js")
            ? memo
            : [...memo, rm(p).then(() => p)], []));
        console.log(removed
            .map((p) => path_1.default.relative(path_1.default.resolve(__dirname, ".."), p))
            .join("\n"));
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
})();
//# sourceMappingURL=clean.js.map