"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const execa_1 = __importDefault(require("execa"));
const path_1 = require("path");
const degreeRotations = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110];
for (const deg of degreeRotations) {
    for (const theme of ["stencil", "stencil_dark"]) {
        const src = `${process.cwd()}/assets/iconTheme/${theme}/status/pending.png`;
        const destDirname = path_1.resolve(path_1.dirname(src), "pending");
        execa_1.default("convert", [
            src,
            "-background",
            "none",
            "-distort",
            "SRT",
            deg.toString(),
            path_1.resolve(destDirname, `pending_${deg}.png`),
        ], { stdio: "inherit" });
    }
}
//# sourceMappingURL=rotate_pending.js.map