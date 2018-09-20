"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const acceptLanguage = require("accept-language");
const i18n = require("i18next");
const uuid_1 = require("uuid");
const i18next_fetch_backend_1 = require("i18next-fetch-backend");
require("isomorphic-fetch");
const __1 = require("../..");
acceptLanguage.languages(['vi', 'en', 'ko', 'zh']);
const getLanguageCode = (acceptLanguageHeader) => {
    try {
        return acceptLanguage.get(acceptLanguageHeader);
    }
    catch (e) {
        return 'vi';
    }
};
exports.getLanguageCode = getLanguageCode;
const defaultResources = {};
const init = (msNames, namespaceList, requestTopic = 'configuration') => {
    i18n
        .use(i18next_fetch_backend_1.default);
    __1.Kafka.getInstance().sendRequest(uuid_1.v4(), requestTopic, 'get:/api/v1/locale', {
        msNames: msNames
    })
        .subscribe((message) => {
        if (message.data.status != null) {
            __1.Logger.error(message.data.status);
            process.exit(1);
        }
        else {
            const data = message.data.data;
            i18n
                .init({
                fallbackLng: 'en',
                preload: ['en', 'ko', 'vi', 'zh'],
                saveMissing: true,
                backend: {
                    loadPath: (lngs, namespaces) => {
                        for (let i = 0; i < data.length; i++) {
                            const element = data[i];
                            if (element.lang === lngs[0]) {
                                for (let j = 0; j < element.files.length; j++) {
                                    const file = element.files[j];
                                    if (file.namespace === namespaces[0]) {
                                        if (element.lang === 'en') {
                                            defaultResources[namespaces[0]] = file.url;
                                        }
                                        return file.url;
                                    }
                                }
                            }
                        }
                        return defaultResources[namespaces[0]];
                    }
                },
                ns: namespaceList,
                defaultNS: namespaceList[0],
                fallbackNS: namespaceList.slice(1)
            });
        }
    });
};
exports.init = init;
const getInstance = () => {
    return i18n;
};
exports.getInstance = getInstance;
//# sourceMappingURL=locale.js.map