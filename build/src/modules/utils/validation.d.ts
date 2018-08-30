import InvalidParameterError from "../errors/InvalidParameterError";
declare type CheckFunc = (value: any, name: string) => any;
export declare class Validate {
    private readonly fieldValue;
    private readonly fieldName;
    private isRequired;
    private checks;
    constructor(fieldValue: any, fieldName: string);
    setRequire: () => this;
    add: (func: CheckFunc) => this;
    adds: (funcs: CheckFunc[]) => this;
    throwValid: (invalidParameterError?: InvalidParameterError) => void;
    valid: () => any;
}
declare const validate: (fieldValue: any, fieldName: string) => Validate;
export { validate };
