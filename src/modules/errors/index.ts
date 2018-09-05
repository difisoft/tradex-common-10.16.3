import FieldRequiredError from "./FieldRequiredError";
import GeneralError from "./GeneralError";
import UriNotFound from "./UriNotFound";
import SystemError from "./SystemError";
import ObjectNotFoundError from "./ObjectNotFoundError";
import InvalidParameterError from "./InvalidParameterError";
import InvalidIdSecretError from "./InvalidIdSecretError";
import InvalidFieldValueError from "./InvalidFieldValueError";
import { ForwardError } from "./ForwardError";
import TokenExpiredError from "./TokenExpiredError";

export const EMAIL_VALIDATION = 'ERROR_EMAIL_VALIDATION';
export {
  FieldRequiredError,
  GeneralError,
  UriNotFound,
  SystemError,
  ObjectNotFoundError,
  InvalidParameterError,
  InvalidIdSecretError,
  InvalidFieldValueError,
  ForwardError,
  TokenExpiredError,
}