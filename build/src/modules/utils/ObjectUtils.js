"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNullOrUndefined = (input) => {
    return (input === undefined || input === null) ? true : false;
};
function setObjKey(obj, key, value) {
    const object = obj;
    if (object == null) {
        return {
            [key]: value
        };
    }
    else {
        object[key] = value;
    }
    return object;
}
exports.setObjKey = setObjKey;
//# sourceMappingURL=ObjectUtils.js.map