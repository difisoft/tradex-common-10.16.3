import GeneralError from "./GeneralError";

export default class InvalidIdSecretError extends GeneralError {
    constructor(source){
        super('INVALID_ID_SECRET', undefined, source);
    }
}