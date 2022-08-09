"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Statuses = void 0;
const preact_1 = require("preact");
const Text_1 = require("./Text");
const Job_1 = require("./Job");
require("./Statuses.scss");
exports.Statuses = ({ onSnooze, jobs }) => {
    return !jobs.length ? (preact_1.h("div", { className: "Statuses" },
        preact_1.h(Text_1.Body, { center: true, children: 'Click "Configure" and setup a job', className: "Statuses-empty" }))) : (preact_1.h("ol", { className: "Statuses" }, jobs
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .map((job) => (preact_1.h("li", { key: job.name },
        preact_1.h(Job_1.Job, { onSnooze: onSnooze, job: job }))))));
};
//# sourceMappingURL=Statuses.js.map