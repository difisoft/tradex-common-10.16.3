export declare class Validate {
    private isRequired;
    private checks;
    private fieldValue;
    private fieldName;
    constructor(fieldValue: any, fieldName: any);
    setRequire: () => this;
    add: (func: any) => this;
    adds: (funcs: any) => this;
    throwValid: (invalidParameterError?: any) => void;
    valid: () => any;
}
declare const validate: (fieldValue: any, fieldName: any) => Validate;
export { validate };
