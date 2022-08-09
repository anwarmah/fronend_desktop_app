"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeIconButton = exports.FileIconButton = exports.IssueIconButton = exports.GearIconButton = exports.IconButton = void 0;
const preact_1 = require("preact");
const clsx_1 = __importDefault(require("clsx"));
require("./IconButton.scss");
const theme_1 = require("../reducers/theme");
exports.IconButton = ({ className, ...rest }) => preact_1.h("button", Object.assign({ className: clsx_1.default("IconButton", className) }, rest));
exports.GearIconButton = (props) => (preact_1.h(exports.IconButton, Object.assign({}, props),
    preact_1.h("i", { className: "icono-gear" })));
exports.IssueIconButton = (props) => (preact_1.h(exports.IconButton, Object.assign({}, props),
    preact_1.h("i", { className: "icono-exclamationCircle" })));
exports.FileIconButton = (props) => (preact_1.h(exports.IconButton, Object.assign({}, props),
    preact_1.h("i", { className: "icono-file" })));
exports.ThemeIconButton = ({ theme, ...rest }) => (preact_1.h(exports.IconButton, Object.assign({}, rest),
    preact_1.h("i", { className: `icono-${theme === theme_1.Themes.Dark ? "sun" : "moon"}` })));
//# sourceMappingURL=IconButton.js.map