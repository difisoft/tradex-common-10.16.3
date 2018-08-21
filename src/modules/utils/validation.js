import FieldRequiredError from "../errors/FieldRequiredError";

export class Validate {
  constructor(fieldValue, fieldName) {
    this.fieldName = fieldName;
    this.fieldValue = fieldValue;
    this.isRequired = false;
    this.checks = [];
  }

  require = () => {
    this.isRequired = true;
    return this;
  };

  add = (func) => {
    this.checks.push(func);
    return this;
  };

  adds = (funcs) => {
    this.checks = this.checks.concat(funcs);
    return this;
  };

  throwValid = (invalidParameterError = undefined) => {
    const result = this.valid();
    if (result) {
      if (invalidParameterError) {
        invalidParameterError.adds(result.params);
      } else {
        throw result;
      }
    }
  };

  valid = () => {
    if (this.isRequired) {
      if (isEmpty(this.fieldValue)) {
        return new FieldRequiredError(this.fieldName);
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
}

const validate = (fieldValue, fieldName) => new Validate(fieldValue, fieldName);

const isEmpty = (fieldValue) => fieldValue === undefined || fieldValue === null || fieldValue === '';

export {
  validate,
};
