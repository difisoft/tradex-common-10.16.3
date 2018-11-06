import { doSafe } from './arrowFunctions';
import {
  onError,
  onNext,
  transform,
  transformAsync,
  transformError,
  transformPromise,
  transformSingle,
  transformSingleAsync,
  transformSinglePromise,
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
import { compareDateOnly, convertStringToDate, DATETIME_DISPLAY_FORMAT, formatDateToDisplay } from './date';
import { generateToken } from './token';
import { getInstance as getI18nInstance, getLanguageCode, init as initI18n } from './locale';
import { compileTemplate, getTemplateResources, init as initTemplateResource } from './template';
import {  
  getForwardUri,
} from './scope';

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
  generateToken,
  getLanguageCode,
  initI18n,
  getI18nInstance,
  initTemplateResource,
  getTemplateResources,
  compileTemplate,
  getForwardUri,
}
