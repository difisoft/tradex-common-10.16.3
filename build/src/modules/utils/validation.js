"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FieldRequiredError_1 = require("../errors/FieldRequiredError");
const errors_1 = require("../errors");
function createFailValidation(code, messageParams, paramName) {
    return {
        success: false,
        params: [{
                code: code,
                messageParams: messageParams,
                param: paramName,
            }],
    };
}
exports.createFailValidation = createFailValidation;
function createFailFromError(error) {
    return {
        success: false,
        params: error.params,
    };
}
exports.createFailFromError = createFailFromError;
function createSuccessValidation(data) {
    return {
        success: true,
        data: data,
    };
}
exports.createSuccessValidation = createSuccessValidation;
class Validate {
    constructor(fieldValue, fieldName) {
        this.fieldValue = fieldValue;
        this.fieldName = fieldName;
        this.isRequired = false;
        this.checks = [];
    }
    setRequire() {
        this.isRequired = true;
        return this;
    }
    ;
    add(func) {
        this.checks.push(func);
        return this;
    }
    ;
    adds(funcs) {
        this.checks = this.checks.concat(funcs);
        return this;
    }
    ;
    throwValid(invalidParameterError) {
        const result = this.valid();
        if (result) {
            if (invalidParameterError) {
                invalidParameterError.adds(result.params);
            }
            else {
                throw result;
            }
        }
    }
    ;
    valid() {
        let result = createSuccessValidation(this.fieldValue);
        if (this.isRequired) {
            if (isEmpty(this.fieldValue)) {
                return createFailFromError(new FieldRequiredError_1.default(this.fieldName));
            }
        }
        if (this.checks.length > 0) {
            if (!this.isRequired && (isEmpty(this.fieldValue))) {
                for (let i = 0; i < this.checks.length; i++) {
                    result = this.checks[i](this.fieldValue, this.fieldName);
                    if (result && !result.success) {
                        return result;
                    }
                }
            }
        }
        return result;
    }
    ;
}
exports.Validate = Validate;
function validate(fieldValue, fieldName) {
    return new Validate(fieldValue, fieldName);
}
exports.validate = validate;
function isEmpty(fieldValue) {
    return fieldValue === undefined || fieldValue === null || fieldValue === '';
}
function validateEmail(fieldValue, paramName = 'email') {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regex.test(fieldValue.toLowerCase())) {
        return createSuccessValidation(fieldValue);
    }
    else {
        return createFailValidation(errors_1.EMAIL_VALIDATION, null, paramName);
    }
}
exports.validateEmail = validateEmail;
//# sourceMappingURL=validation.js.map