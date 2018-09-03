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
import { validate } from './validation';
import { singleton } from './Singleton';
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
  formatDateToDisplay
}