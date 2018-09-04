import { doSafe } from './arrowFunctions';
import {
  onError,
  onNext,
  transform,
  transformAsync,
  transformPromise,
  transformSingle,
  transformSingleAsync,
  transformSinglePromise,
} from './rx';
import {validate, validateEmail, createFailFromError, createFailValidation, createSuccessValidation, Validate} from './validation';
import {singleton} from './Singleton';
import { formatDateToDisplay, convertStringToDate } from './date';

export default {
  validate,
  validateEmail,
  doSafe,
  onError,
  onNext,
  transform,
  transformAsync,
  transformPromise,
  singleton,
  transformSingle,
  transformSingleAsync,
  transformSinglePromise,
  createFailFromError,
  createFailValidation,
  createSuccessValidation,
  Validate,
  formatDateToDisplay,
  convertStringToDate
}