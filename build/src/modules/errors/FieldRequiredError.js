"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InvalidParameterError_1 = require("./InvalidParameterError");
class FieldRequiredError extends InvalidParameterError_1.default {
    constructor(fieldName) {
        super([{
                code: 'FIELD_IS_REQUIRED',
                params: fieldName,
                messageParams: [fieldName],
            }]);
    }
}
exports.default = FieldRequiredError;
//# sourceMappingURL=FieldRequiredError.js.map