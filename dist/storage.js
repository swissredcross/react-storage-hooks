"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var toStorage = function (value) { return JSON.stringify(value); };
var fromStorage = function (value) {
    return value !== null ? JSON.parse(value) : null;
};
exports.useStorageListener = function (key, onChange) {
    var handleStorageChange = function (event) {
        if (event.key === key && (event.newValue === event.oldValue) === false) {
            onChange(fromStorage(event.newValue));
        }
    };
    react_1.useEffect(function () {
        window.addEventListener('storage', handleStorageChange);
        return function () {
            window.removeEventListener('storage', handleStorageChange);
        };
    });
};
var writeItem = function (storage, key, value) {
    return new Promise(function (resolve, reject) {
        try {
            storage.setItem(key, toStorage(value));
            resolve();
        }
        catch (error) {
            reject(error);
        }
    });
};
exports.useStorageWriter = function (storage, key, state) {
    var _a = react_1.useState(undefined), writeError = _a[0], setWriteError = _a[1];
    react_1.useEffect(function () {
        writeItem(storage, key, state).catch(setWriteError);
    }, [state, key, storage]);
    react_1.useEffect(function () {
        setWriteError(undefined);
    }, [key]);
    return writeError;
};
var readItem = function (storage, key) {
    try {
        var storedValue = storage.getItem(key);
        return fromStorage(storedValue);
    }
    catch (e) {
        return null;
    }
};
exports.useStorageReader = function (storage, key, defaultValue) {
    return react_1.useMemo(function () {
        var storedValue = readItem(storage, key);
        return storedValue !== null ? storedValue : defaultValue;
    }, [key, storage, defaultValue]);
};
//# sourceMappingURL=storage.js.map