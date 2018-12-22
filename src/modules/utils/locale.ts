import * as acceptLanguage from 'accept-language';
import * as i18n from 'i18next';
import { v4 as uuid } from 'uuid';
import Backend from 'i18next-fetch-backend';
import 'isomorphic-fetch';
import { Kafka, Logger } from '../..';
import { IStatus, IParamError } from '../models';

acceptLanguage.languages(['vi', 'en', 'ko', 'zh']);

const getLanguageCode = (acceptLanguageHeader: string): string => {
  try {
    return acceptLanguage.get(acceptLanguageHeader);
  } catch (e) {
    return 'vi';
  }
};

const defaultResources: any = {};

const init = (msNames: string, namespaceList: string[], requestTopic: string = 'configuration', uri: string = '/api/v1/locale'): void => {
  i18n
    .use(Backend)

  Kafka.getInstance().sendRequest(
    uuid(),
    requestTopic,
    uri,
    {
      msNames: msNames
    })
    .subscribe((message: Kafka.IMessage) => {
      if (message.data.status != null) {
        Logger.error(message.data.status);
      } else {
        const data = message.data.data;

        i18n
          .init({
            fallbackLng: 'en',
            preload: ['en', 'ko', 'vi', 'zh'],
            saveMissing: true,
            backend: {
              loadPath: (lngs: string, namespaces: string) => {
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
            // have a common namespace used around the full app
            ns: namespaceList,
            defaultNS: namespaceList[0],
            fallbackNS: namespaceList.slice(1)
          });
      }

    });
}

const getInstance = (): any => {
  return i18n;
}

const translateErrorMessage = (errorObject: IStatus, lang: string): IStatus => {
  const messageParams = errorObject.messageParams;

  const errorResponse: IStatus = {
    code: errorObject.code,
    messageParams: messageParams
  };

  const placeholders: any = {};

  if (messageParams != null) {
    for (let i = 0; i < messageParams.length; i++) {
      placeholders[i] = i18n.t(messageParams[i], { lng: lang });
    }
  }

  //Handle sub messages
  const params: IParamError[] = errorObject.params;

  if (params != null && params.length > 0) {
    errorResponse.params = [];
    for (let i = 0; i < params.length; i++) {
      const subCode = params[i].code;
      const subMessageParams = params[i].messageParams;
      const subPlaceholders: any = {};
      subPlaceholders.lng = lang;

      if (subMessageParams != null) {
        for (let j = 0; j < subMessageParams.length; j++) {
          subPlaceholders[j] = i18n.t(subMessageParams[j], { lng: lang });
        }
      }


      const subMessage = i18n.t(subCode, subPlaceholders);
      errorResponse.params[i] = {
        code: subCode,
        message: subMessage,
        param: params[i].param
      };
    }
  }

  const message = i18n.t(errorObject.code, placeholders);
  errorResponse.message = message;

  return errorResponse;
}

export { getLanguageCode, init, getInstance, translateErrorMessage }