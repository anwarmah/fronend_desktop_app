"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prodWebIndex = exports.isDev = void 0;
const path_1 = require("path");
exports.isDev = !!process.env.ELECTRON_IS_DEV;
exports.prodWebIndex = `${path_1.resolve(__dirname, "..", "dist_web", "index.html")}`;
//# sourceMappingURL=env.js.map