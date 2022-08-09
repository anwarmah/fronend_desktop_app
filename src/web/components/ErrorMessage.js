"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMessage = void 0;
const preact_1 = require("preact");
const Text_1 = require("./Text");
require("./ErrorMessage.scss");
exports.ErrorMessage = ({ children, title, ...rest }) => (preact_1.h("div", Object.assign({ className: "ErrorMessage" }, rest),
    preact_1.h("i", { className: "ErrorMessage-icon icono-exclamationCircle" }),
    title && preact_1.h(Text_1.Heading, null, title),
    preact_1.h("div", { className: "ErrorMessage-content" }, children)));
//# sourceMappingURL=ErrorMessage.js.map