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
import { convertStringToDate, formatDateToDisplay, DATETIME_DISPLAY_FORMAT } from './date';
import { generateToken } from './token';
import { init as initI18n, getLanguageCode, getInstance as getI18nInstance } from './locale';
import { init as initTemplateResource, getTemplateResources, compileTemplate } from './template';

export default {
  validate,
  validateEmail,
  validatePassword,
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
  convertStringToDate,
  DATETIME_DISPLAY_FORMAT,
  generateToken,
  getLanguageCode,
  initI18n,
  getI18nInstance,
  initTemplateResource,
  getTemplateResources,
  compileTemplate
}