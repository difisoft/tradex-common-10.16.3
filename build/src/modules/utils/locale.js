"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const acceptLanguage = require("accept-language");
const i18n = require("i18next");
const uuid_1 = require("uuid");
const i18next_fetch_backend_1 = require("i18next-fetch-backend");
require("isomorphic-fetch");
const __1 = require("../..");
acceptLanguage.languages(['vi', 'en', 'kr', 'zh']);
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
const init = (requestTopic, msNames, namsespaces) => {
    i18n
        .use(i18next_fetch_backend_1.default);
    __1.Kafka.getInstance().sendRequest(uuid_1.v4(), requestTopic, 'get:/api/v1/locale', {
        msNames: msNames
    })
        .subscribe((message) => {
        const data = message.data.data;
        if (data.status != null) {
            __1.Logger.error(data.status);
            process.exit(1);
        }
        else {
            i18n
                .init({
                fallbackLng: 'en',
                preload: ['en', 'kr', 'vi', 'zh'],
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
                ns: namsespaces,
                defaultNS: namsespaces[0],
                fallbackNS: namsespaces.slice(1)
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