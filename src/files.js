"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFirstExistingFilename = void 0;
const fs_extra_1 = require("fs-extra");
exports.getFirstExistingFilename = async (...filenames) => {
    let isAccessible = false;
    for (const filename of filenames) {
        await fs_extra_1.access(filename)
            .then(() => {
            isAccessible = true;
        })
            .catch(() => { });
        if (isAccessible)
            return filename;
    }
    throw new Error("no filenames accessible");
};
//# sourceMappingURL=files.js.map