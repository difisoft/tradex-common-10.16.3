"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arrowFunctions_1 = require("./arrowFunctions");
const rx_1 = require("./rx");
const validation_1 = require("./validation");
const Singleton_1 = require("./Singleton");
const date_1 = require("./date");
const StringUtils_1 = require("./StringUtils");
const ObjectUtils_1 = require("./ObjectUtils");
const MathUtils_1 = require("./MathUtils");
const ArrayUtils_1 = require("./ArrayUtils");
const token_1 = require("./token");
const locale_1 = require("./locale");
const template_1 = require("./template");
const scope_1 = require("./scope");
const keys_1 = require("./keys");
const InstanceContainer_1 = require("./InstanceContainer");
const State_1 = require("./State");
exports.State = State_1.default;
const promise_1 = require("./promise");
const Mongo = require("./mongo");
const config_1 = require("./config");
const mstime_1 = require("./mstime");
exports.default = {
    validate: validation_1.validate,
    validateEmail: validation_1.validateEmail,
    validatePassword: validation_1.validatePassword,
    doSafe: arrowFunctions_1.doSafe,
    onError: rx_1.onError,
    onNext: rx_1.onNext,
    transform: rx_1.transform,
    transformError: rx_1.transformError,
    transformAsync: rx_1.transformAsync,
    transformPromise: rx_1.transformPromise,
    transformPromiseAsync: rx_1.transformPromiseAsync,
    singleton: Singleton_1.singleton,
    transformSingle: rx_1.transformSingle,
    transformSingleAsync: rx_1.transformSingleAsync,
    transformSinglePromise: rx_1.transformSinglePromise,
    createFailFromError: validation_1.createFailFromError,
    createFailValidation: validation_1.createFailValidation,
    createSuccessValidation: validation_1.createSuccessValidation,
    Validate: validation_1.Validate,
    formatDateToDisplay: date_1.formatDateToDisplay,
    compareDateOnly: date_1.compareDateOnly,
    convertStringToDate: date_1.convertStringToDate,
    DATETIME_DISPLAY_FORMAT: date_1.DATETIME_DISPLAY_FORMAT,
    DATE_DISPLAY_FORMAT: date_1.DATE_DISPLAY_FORMAT,
    generateToken: token_1.generateToken,
    getLanguageCode: locale_1.getLanguageCode,
    initI18n: locale_1.init,
    initI18nInternal: locale_1.initInternal,
    getI18nInstance: locale_1.getInstance,
    translateErrorMessage: locale_1.translateErrorMessage,
    initTemplateResource: template_1.init,
    getTemplateResources: template_1.getTemplateResources,
    compileTemplate: template_1.compileTemplate,
    getForwardUri: scope_1.getForwardUri,
    isEmpty: StringUtils_1.isEmpty,
    isNullOrUndefined: ObjectUtils_1.isNullOrUndefined,
    getStartOfDate: date_1.getStartOfDate,
    getEndOfDate: date_1.getEndOfDate,
    round: MathUtils_1.round,
    processJwtKey: keys_1.processJwtKey,
    processJwtKeyByDomain: keys_1.processJwtKeyByDomain,
    processJwtKeyObject: keys_1.processJwtKeyObject,
    TRADEX_DOMAIN: keys_1.TRADEX_DOMAIN,
    container: InstanceContainer_1.default,
    promise: promise_1.promise,
    handlePromise: promise_1.handlePromise,
    RetryError: promise_1.RetryError,
    asyncWithRetry: promise_1.asyncWithRetry,
    removeDuplicateObj: ArrayUtils_1.removeDuplicateObj,
    VCSC_DOMAIN: keys_1.VCSC_DOMAIN,
    DOMAINS: keys_1.DOMAINS,
    allPromiseDone: promise_1.allPromiseDone,
    Mongo,
    setObjKey: ObjectUtils_1.setObjKey,
    createJwtConfig: config_1.createJwtConfig,
    getEnvArr: config_1.getEnvArr,
    getEnvNum: config_1.getEnvNum,
    getEnvStr: config_1.getEnvStr,
    getEnvJson: config_1.getEnvJson,
    diffMsTime: mstime_1.diffMsTime,
};
//# sourceMappingURL=index.js.map