"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var state_1 = __importDefault(require("./state"));
var reducer_1 = __importDefault(require("./reducer"));
var createUseReducer = function (storage) {
    if (storage) {
        return reducer_1.default(storage);
    }
    return function (key, reducer, initializerArg, initializer) {
        var _a = initializer
            ? react_1.useReducer(reducer, initializerArg, initializer)
            : react_1.useReducer(reducer, initializerArg), state = _a[0], dispatch = _a[1];
        return [state, dispatch, undefined];
    };
};
var createUseState = function (storage) {
    if (storage) {
        return state_1.default(storage);
    }
    return function (key, defaultState) {
        var _a = react_1.useState(defaultState), state = _a[0], setState = _a[1];
        return [state, setState, undefined];
    };
};
var getLocalStorage = function () {
    return typeof localStorage === 'undefined' ? null : localStorage;
};
var getSessionStorage = function () {
    return typeof sessionStorage === 'undefined' ? null : sessionStorage;
};
exports.useLocalStorageState = createUseState(getLocalStorage());
exports.useSessionStorageState = createUseState(getSessionStorage());
exports.useLocalStorageReducer = createUseReducer(getLocalStorage());
exports.useSessionStorageReducer = createUseReducer(getSessionStorage());
//# sourceMappingURL=index.js.map