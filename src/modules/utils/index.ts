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
import {validate, createFailFromError, createFailValidation, createSuccessValidation, Validate} from './validation';
import {singleton} from './Singleton';
import { formatDateToDisplay } from './date';

export default {
  validate,
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
  formatDateToDisplay
}