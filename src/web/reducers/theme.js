"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.theme = exports.toggle = exports.getInitialTheme = exports.Themes = void 0;
var Themes;
(function (Themes) {
    Themes["Dark"] = "dark";
    Themes["Light"] = "light";
})(Themes = exports.Themes || (exports.Themes = {}));
// Fetch from main process
// TODO: Refactor to pass with initial `appState`?
// https://github.com/nathanbuchar/electron-settings/wiki/FAQs#can-i-use-electron-settings-in-both-the-main-and-renderer-processes
exports.getInitialTheme = () => {
    try {
        const theme = window
            .require("electron")
            .remote.require("electron-settings")
            .get("theme");
        return theme || Themes.Light;
    }
    catch {
        return Themes.Light;
    }
};
exports.toggle = (theme) => theme === Themes.Dark ? Themes.Light : Themes.Dark;
exports.theme = (state = {
    value: exports.getInitialTheme(),
}, action) => {
    if (action.type === "TOGGLE_THEME") {
        return {
            value: exports.toggle(state.value),
        };
    }
    return state;
};
//# sourceMappingURL=theme.js.map