"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Code = exports.Caption = exports.Body = exports.Subheading = exports.Heading = exports.Text = void 0;
const preact_1 = require("preact");
const clsx_1 = __importDefault(require("clsx"));
require("./Text.scss");
exports.Text = ({ bold, center, className, element: Component = "span", ...rest }) => (preact_1.h(Component, Object.assign({ className: clsx_1.default("Text", {
        "Text-bold": bold,
        "Text-center": center,
    }, className) }, rest)));
exports.Heading = ({ className, element: Component = "h1", ...rest }) => preact_1.h(exports.Text, Object.assign({ className: clsx_1.default("Text-heading", className) }, rest));
exports.Subheading = ({ className, element: Component = "h2", ...rest }) => preact_1.h(exports.Text, Object.assign({ className: clsx_1.default("Text-subheading", className) }, rest));
exports.Body = ({ className, element: Component = "p", ...rest }) => preact_1.h(exports.Text, Object.assign({ className: clsx_1.default("Text-body", className) }, rest));
exports.Caption = ({ className, ...rest }) => preact_1.h(exports.Text, Object.assign({ className: clsx_1.default("Text-caption", className) }, rest));
exports.Code = ({ block, children, className, ...rest }) => block ? (preact_1.h("pre", Object.assign({ className: clsx_1.default("Text-code-block", className) }, rest),
    preact_1.h("code", null, children))) : (preact_1.h("code", Object.assign({ className: clsx_1.default("Text-code", className) }, rest), children));
//# sourceMappingURL=Text.js.map