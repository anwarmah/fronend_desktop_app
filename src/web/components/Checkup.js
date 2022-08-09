"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Checkup = void 0;
const hooks_1 = require("preact/hooks");
const clsx_1 = __importDefault(require("clsx"));
const preact_1 = require("preact");
const Statuses_1 = require("./Statuses");
const ErrorMessage_1 = require("./ErrorMessage");
const IconButton_1 = require("./IconButton");
const Text_1 = require("./Text");
const reducers_1 = require("../reducers");
require("./Checkup.scss");
const theme_1 = require("../reducers/theme");
exports.Checkup = ({ onConfigure, onIssue, onOpenLog, onToggleTheme, onSnooze, state: { main }, }) => {
    const [state, dispatch] = hooks_1.useReducer(reducers_1.rootReducer, reducers_1.initialState);
    return (preact_1.h("div", { className: clsx_1.default("checkup", {
            "checkup-dark": state.theme.value === theme_1.Themes.Dark,
        }) },
        preact_1.h("main", { className: "checkup-content" }, main && main.state === "OK" ? (preact_1.h(Statuses_1.Statuses, { onSnooze: onSnooze, jobs: main ? Object.values(main.jobs) : [] })) : (preact_1.h(ErrorMessage_1.ErrorMessage, { title: "Bad config" },
            preact_1.h(Text_1.Body, null,
                "Bad configuration file detected:",
                " ",
                main.errorMessage || "unknown error")))),
        preact_1.h("nav", { className: "checkup-controls" },
            preact_1.h(IconButton_1.IssueIconButton, { onClick: onIssue, title: "Open an issue" }),
            preact_1.h("div", { className: "checkup-controls-spacer" }),
            preact_1.h(IconButton_1.ThemeIconButton, { onClick: (event) => {
                    // TODO: Move to middleware
                    onToggleTheme(theme_1.toggle(state.theme.value));
                    dispatch({
                        payload: null,
                        type: "TOGGLE_THEME",
                    });
                }, theme: state.theme.value, title: "Change theme" }),
            preact_1.h(IconButton_1.FileIconButton, { onClick: onOpenLog, title: "Open log file" }),
            preact_1.h(IconButton_1.GearIconButton, { onClick: onConfigure, title: "Configure" }))));
};
//# sourceMappingURL=Checkup.js.map