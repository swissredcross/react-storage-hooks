"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var storage_1 = require("./storage");
var INTERNAL_SET_ACTION_TYPE = Symbol('INTERNAL_SET_ACTION_TYPE');
var createInternalSetAction = function (payload) { return ({
    type: INTERNAL_SET_ACTION_TYPE,
    payload: payload,
}); };
var isInternalSetAction = function (action) {
    return action && action.type === INTERNAL_SET_ACTION_TYPE;
};
var createStorageReducer = function (reducer) { return function (prevState, action) {
    return isInternalSetAction(action) ? action.payload : reducer(prevState, action);
}; };
var createUseStorageReducer = function (storage) { return function (key, reducer, initializerArg, initializer) {
    var storageReducer = createStorageReducer(reducer);
    var storageInitializerArg = storage_1.useStorageReader(storage, key, initializerArg);
    var _a = initializer
        ? react_1.useReducer(storageReducer, storageInitializerArg, initializer)
        : react_1.useReducer(storageReducer, storageInitializerArg), state = _a[0], dispatch = _a[1];
    var writeError = storage_1.useStorageWriter(storage, key, state);
    storage_1.useStorageListener(key, function (newValue) {
        dispatch(createInternalSetAction(newValue));
    });
    react_1.useEffect(function () {
        dispatch(createInternalSetAction(initializer ? initializer(storageInitializerArg) : storageInitializerArg));
    }, [key, dispatch, initializer, storageInitializerArg]);
    return [state, dispatch, writeError];
}; };
exports.default = createUseStorageReducer;
//# sourceMappingURL=reducer.js.map