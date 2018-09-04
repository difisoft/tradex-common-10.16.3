import FieldRequiredError from "../errors/FieldRequiredError";
import InvalidParameterError from "../errors/InvalidParameterError";
import IParamError from "../models/IParamError";

declare type CheckFunc = (value: any, name: string) => IValidationResult;

declare interface IValidationResult {
  success: boolean,
  data?: any,
  params?: IParamError[],
}

function createFailValidation(code: string, messageParams: string[], paramName: string): IValidationResult {
  return {
    success: false,
    params: [{
      code: code,
      messageParams: messageParams,
      param: paramName,
    }],
  }
}

function createFailFromError(error: InvalidParameterError): IValidationResult {
  return {
    success: false,
    params: error.params,
  }
}

function createSuccessValidation(data: any): IValidationResult {
  return {
    success: true,
    data: data,
  }
}

export class Validate {
  private isRequired: boolean = false;
  private checks: CheckFunc[] = [];

  constructor(private readonly fieldValue: any, private readonly fieldName: string) {
  }

  public setRequire(): Validate {
    this.isRequired = true;
    return this;
  };

  public add(func: CheckFunc): Validate {
    this.checks.push(func);
    return this;
  };

  public adds(funcs: CheckFunc[]): Validate {
    this.checks = this.checks.concat(funcs);
    return this;
  };

  public throwValid(invalidParameterError?: InvalidParameterError): void {
    const result = this.valid();
    if (result) {
      if (invalidParameterError) {
        invalidParameterError.adds(result.params);
      } else {
        throw result;
      }
    }
  };

  public valid(): IValidationResult {
    let result: IValidationResult = createSuccessValidation(this.fieldValue);
    if (this.isRequired) {
      if (isEmpty(this.fieldValue)) {
        return createFailFromError(new FieldRequiredError(this.fieldName));
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
  };
}

function validate(fieldValue: any, fieldName: string): Validate {
  return new Validate(fieldValue, fieldName);
}

function isEmpty(fieldValue: any): boolean {
  return fieldValue === undefined || fieldValue === null || fieldValue === '';
}

export {
  validate,
  createFailValidation,
  createFailFromError,
  createSuccessValidation,
};
