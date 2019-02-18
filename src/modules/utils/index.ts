import { doSafe } from './arrowFunctions';
import {
  onError,
  onNext,
  transform,
  transformAsync,
  transformError,
  transformPromise,
  transformPromiseAsync,
  transformSingle,
  transformSingleAsync,
  transformSinglePromise
} from './rx';
import {
  createFailFromError,
  createFailValidation,
  createSuccessValidation,
  validate,
  Validate,
  validateEmail,
  validatePassword
} from './validation';
import { singleton } from './Singleton';
import {
  compareDateOnly,
  convertStringToDate,
  DATETIME_DISPLAY_FORMAT,
  DATE_DISPLAY_FORMAT,
  formatDateToDisplay,
  getStartOfDate,
  getEndOfDate
} from './date';
import { isEmpty } from './StringUtils';
import { isNullOrUndefined } from './ObjectUtils';
import { round } from './MathUtils';
import { generateToken } from './token';
import {
  getInstance as getI18nInstance,
  getLanguageCode,
  init as initI18n,
  initInternal as initI18nInternal,
  translateErrorMessage
} from './locale';
import { compileTemplate, getTemplateResources, init as initTemplateResource } from './template';
import { getForwardUri } from './scope';
import { processJwtKey, processJwtKeyByDomain, processJwtKeyObject, TRADEX_DOMAIN } from './keys';
import container from './InstanceContainer';
import State from './State';
import { promise, handlePromise, Resolve, Reject, PromiseFunction } from './promise';

export default {
  validate,
  validateEmail,
  validatePassword,
  doSafe,
  onError,
  onNext,
  transform,
  transformError,
  transformAsync,
  transformPromise,
  transformPromiseAsync,
  singleton,
  transformSingle,
  transformSingleAsync,
  transformSinglePromise,
  createFailFromError,
  createFailValidation,
  createSuccessValidation,
  Validate,
  formatDateToDisplay,
  compareDateOnly,
  convertStringToDate,
  DATETIME_DISPLAY_FORMAT,
  DATE_DISPLAY_FORMAT,
  generateToken,
  getLanguageCode,
  initI18n,
  initI18nInternal,
  getI18nInstance,
  translateErrorMessage,
  initTemplateResource,
  getTemplateResources,
  compileTemplate,
  getForwardUri,
  isEmpty,
  isNullOrUndefined,
  getStartOfDate,
  getEndOfDate,
  round,
  processJwtKey,
  processJwtKeyByDomain,
  processJwtKeyObject,
  TRADEX_DOMAIN,
  container,
  promise,
  handlePromise
};

export {
  State,
  Resolve,
  Reject,
  PromiseFunction
}
