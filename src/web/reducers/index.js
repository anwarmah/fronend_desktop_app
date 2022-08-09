"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialState = exports.rootReducer = void 0;
const utils_1 = require("./utils");
const theme_1 = require("./theme");
exports.rootReducer = utils_1.combineReducers({
    theme: theme_1.theme,
});
exports.initialState = utils_1.getInitialState(exports.rootReducer);
//# sourceMappingURL=index.js.map