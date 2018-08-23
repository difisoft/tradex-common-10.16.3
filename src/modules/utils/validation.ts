import FieldRequiredError from "../errors/FieldRequiredError";

export class Validate {
  private isRequired: boolean;
  private checks: any;
  private fieldValue: any;
  private fieldName: any;

  constructor(fieldValue: any, fieldName: any) {
    this.fieldName = fieldName;
    this.fieldValue = fieldValue;
    this.isRequired = false;
    this.checks = [];
  }

  public setRequire = () => {
    this.isRequired = true;
    return this;
  };

  public add = (func: any) => {
    this.checks.push(func);
    return this;
  };

  public adds = (funcs: any) => {
    this.checks = this.checks.concat(funcs);
    return this;
  };

  public throwValid = (invalidParameterError?: any) => {
    const result = this.valid();
    if (result) {
      if (invalidParameterError) {
        invalidParameterError.adds(result.params);
      } else {
        throw result;
      }
    }
  };

  public valid = () => {
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

const validate = (fieldValue: any, fieldName: any) => new Validate(fieldValue, fieldName);

const isEmpty = (fieldValue: any) => fieldValue === undefined || fieldValue === null || fieldValue === '';

export {
  validate
};
