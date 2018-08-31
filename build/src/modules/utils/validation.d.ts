import InvalidParameterError from "../errors/InvalidParameterError";
declare type CheckFunc = (value: any, name: string) => any;
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
    valid(): any;
}
declare function validate(fieldValue: any, fieldName: string): Validate;
export { validate };
