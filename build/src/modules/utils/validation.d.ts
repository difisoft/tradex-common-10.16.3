import InvalidParameterError from "../errors/InvalidParameterError";
import IParamError from "../models/IParamError";
declare type CheckFunc = (value: any, name: string) => IValidationResult;
declare interface IValidationResult {
    success: boolean;
    data?: any;
    params?: IParamError[];
}
declare function createFailValidation(code: string, messageParams: string[], paramName: string): IValidationResult;
declare function createFailFromError(error: InvalidParameterError): IValidationResult;
declare function createSuccessValidation(data: any): IValidationResult;
export declare class Validate {
    private readonly fieldValue;
    private readonly fieldName;
    private isRequired;
    private checks;
    constructor(fieldValue: any, fieldName: string);
    setRequire(): Validate;
    add(func: CheckFunc): Validate;
    adds(funcs: CheckFunc[]): Validate;
    throwValid(invalidParameterError?: InvalidParameterError): void;
    valid(): IValidationResult;
}
declare function validate(fieldValue: any, fieldName: string): Validate;
export { validate, createFailValidation, createFailFromError, createSuccessValidation, };
