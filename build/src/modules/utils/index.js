"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arrowFunctions_1 = require("./arrowFunctions");
const rx_1 = require("./rx");
const validation_1 = require("./validation");
const Singleton_1 = require("./Singleton");
const date_1 = require("./date");
const token_1 = require("./token");
const locale_1 = require("./locale");
const template_1 = require("./template");
const scope_1 = require("./scope");
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
    generateToken: token_1.generateToken,
    getLanguageCode: locale_1.getLanguageCode,
    initI18n: locale_1.init,
    getI18nInstance: locale_1.getInstance,
    initTemplateResource: template_1.init,
    getTemplateResources: template_1.getTemplateResources,
    compileTemplate: template_1.compileTemplate,
    getForwardUri: scope_1.getForwardUri,
};
//# sourceMappingURL=index.js.map