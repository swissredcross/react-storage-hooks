"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var storage_1 = require("./storage");
var createUseStorageState = function (storage) { return function (key, defaultState) {
    var savedState = storage_1.useStorageReader(storage, key, defaultState);
    var _a = react_1.useState(savedState), state = _a[0], setState = _a[1];
    var writeError = storage_1.useStorageWriter(storage, key, state);
    storage_1.useStorageListener(key, setState);
    react_1.useEffect(function () {
        setState(savedState);
    }, [key, savedState]);
    return [state, setState, writeError];
}; };
exports.default = createUseStorageState;
//# sourceMappingURL=state.js.map