import FieldRequiredError from "../errors/FieldRequiredError";
import InvalidParameterError from "../errors/InvalidParameterError";

declare type CheckFunc = (value: any, name: string) => any;

export class Validate {
  private isRequired: boolean;
  private checks: CheckFunc[];

  constructor(private readonly fieldValue: any, private readonly fieldName: string) {
    this.isRequired = false;
    this.checks = [];
  }

  public setRequire = () => {
    this.isRequired = true;
    return this;
  };

  public add = (func: CheckFunc) => {
    this.checks.push(func);
    return this;
  };

  public adds = (funcs: CheckFunc[]) => {
    this.checks = this.checks.concat(funcs);
    return this;
  };

  public throwValid = (invalidParameterError?: InvalidParameterError) => {
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

const validate = (fieldValue: any, fieldName: string) => new Validate(fieldValue, fieldName);

const isEmpty = (fieldValue: any) => fieldValue === undefined || fieldValue === null || fieldValue === '';

export {
  validate
};
