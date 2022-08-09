"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Job = void 0;
const preact_1 = require("preact");
const moment_1 = __importDefault(require("moment"));
const clsx_1 = __importDefault(require("clsx"));
const Text_1 = require("./Text");
require("./Job.scss");
const env_1 = require("../../env");
const snoozeUrl = require("../img/snooze/snooze.png");
require("dragscroll");
const getNextRunEstimate = (nextRunDate) => nextRunDate
    ? moment_1.default
        .duration(moment_1.default(nextRunDate).toDate().getTime() - new Date().getTime(), "ms")
        .humanize()
    : "?";
const hideActionMenu = (evt) => {
    let parent = evt.currentTarget.parentElement;
    while (parent) {
        parent.scrollTo({ left: 0, behavior: "smooth" });
        parent = parent.parentElement;
    }
};
exports.Job = ({ className, onSnooze, job: { name, state: { message, nextRunDate, status, snoozedUntilIsoStr }, }, ...rest }) => {
    const actions = {
        isSnoozeActionVisible: env_1.isDev || status !== "ok",
    };
    const actionCount = Object.values(actions).filter((i) => i).length;
    return (preact_1.h("div", Object.assign({ className: clsx_1.default("Job", className, `Job-action-count-${actionCount}`, {
            dragscroll: actionCount > 0,
        }) }, rest),
        preact_1.h("div", { className: clsx_1.default("Job-icon", {
                "Job-icon-ok": status === "ok",
                "Job-icon-error": status === "not_ok",
                "Job-icon-progress": status === "pending",
            }) },
            preact_1.h("i", { className: clsx_1.default({
                    "icono-cup": status === "snoozed",
                    "icono-checkCircle": status === "ok",
                    "icono-crossCircle": status === "not_ok",
                    "icono-sync": status === "pending",
                }) })),
        preact_1.h("div", { className: "Job-content" },
            preact_1.h("div", { className: "Job-content-top" },
                preact_1.h(Text_1.Body, { className: "Job-name" }, name),
                preact_1.h(Text_1.Caption, { className: "Job-next-run" }, snoozedUntilIsoStr
                    ? `snoozed 'till: ${getNextRunEstimate(snoozedUntilIsoStr)}`
                    : `next in: ${getNextRunEstimate(nextRunDate)}`)),
            !!message && preact_1.h(Text_1.Code, { block: true, className: "Job-message", children: message })),
        !!actionCount && preact_1.h("div", { className: "grippy" }),
        preact_1.h("div", { className: "Job-actions" }, actions.isSnoozeActionVisible ? (preact_1.h("div", { className: "Job-snooze", onClick: (evt) => {
                onSnooze(name);
                hideActionMenu(evt);
            }, style: { height: "100%", width: "100%" }, children: preact_1.h("img", { src: snoozeUrl }) })) : null)));
};
//# sourceMappingURL=Job.js.map