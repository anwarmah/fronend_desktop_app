"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInitialState = exports.combineReducers = void 0;
const INIT_ACTION = {
    payload: null,
    type: "__INIT__",
};
exports.combineReducers = (reducers) => {
    const reducerNames = Object.keys(reducers);
    return (state, action) => reducerNames.reduce((nextState, name) => ({
        ...nextState,
        [name]: reducers[name](state ? state[name] : undefined, action),
    }), {});
};
exports.getInitialState = (rootReducer) => rootReducer(undefined, INIT_ACTION);
//# sourceMappingURL=utils.js.map