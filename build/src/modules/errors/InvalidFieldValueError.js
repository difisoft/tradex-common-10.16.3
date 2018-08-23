"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InvalidParameterError_1 = require("./InvalidParameterError");
class InvalidFieldValueError extends InvalidParameterError_1.default {
    constructor(fieldName, fieldValue) {
        super([{
                code: 'INVALID_FIELD_VALUE',
                params: fieldName,
                messageParams: [fieldName, fieldValue]
            }]);
    }
}
exports.default = InvalidFieldValueError;
//# sourceMappingURL=InvalidFieldValueError.js.map