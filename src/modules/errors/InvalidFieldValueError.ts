import InvalidParameterError from "./InvalidParameterError";

export default class InvalidFieldValueError extends InvalidParameterError {
  constructor(fieldName: any, fieldValue: any) {
    super([{
      code: 'INVALID_FIELD_VALUE',
      params: fieldName,
      messageParams: [fieldName, fieldValue]
    }]);
  }
}