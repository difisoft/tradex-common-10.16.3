import GeneralError from "./GeneralError";

export default class InvalidParameterError extends GeneralError {
  add = (code, fieldName, messageParams) => {
    this.params.push({
      code,
      fieldName,
      messageParams,
    });
    return this;
  };
  adds = (params) => {
    this.params = this.params.concat(params);
    return this;
  };

  constructor(params = []) {
    super('INVALID_PARAMETER', params);
  }
}