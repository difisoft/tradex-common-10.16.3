import InvalidParameterError from "./InvalidParameterError";

export default class FieldRequiredError extends InvalidParameterError {
  constructor(fieldName: any) {
    super([{
      code: 'FIELD_IS_REQUIRED',
      params: fieldName,
      messageParams: [fieldName],
    }]);
  }
}