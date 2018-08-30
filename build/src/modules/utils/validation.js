"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FieldRequiredError_1 = require("../errors/FieldRequiredError");
class Validate {
    constructor(fieldValue, fieldName) {
        this.fieldValue = fieldValue;
        this.fieldName = fieldName;
        this.setRequire = () => {
            this.isRequired = true;
            return this;
        };
        this.add = (func) => {
            this.checks.push(func);
            return this;
        };
        this.adds = (funcs) => {
            this.checks = this.checks.concat(funcs);
            return this;
        };
        this.throwValid = (invalidParameterError) => {
            const result = this.valid();
            if (result) {
                if (invalidParameterError) {
                    invalidParameterError.adds(result.params);
                }
                else {
                    throw result;
                }
            }
        };
        this.valid = () => {
            if (this.isRequired) {
                if (isEmpty(this.fieldValue)) {
                    return new FieldRequiredError_1.default(this.fieldName);
                }
            }
            if (this.checks.length > 0) {
                if (!this.isRequired && (isEmpty(this.fieldValue))) {
                    for (let i = 0; i < this.checks.length; i++) {
                        const result = this.checks[i](this.fieldValue, this.fieldName);
                        if (result) {
                            return result;
                        }
                    }
                }
            }
            return null;
        };
        this.isRequired = false;
        this.checks = [];
    }
}
exports.Validate = Validate;
const validate = (fieldValue, fieldName) => new Validate(fieldValue, fieldName);
exports.validate = validate;
const isEmpty = (fieldValue) => fieldValue === undefined || fieldValue === null || fieldValue === '';
//# sourceMappingURL=validation.js.map