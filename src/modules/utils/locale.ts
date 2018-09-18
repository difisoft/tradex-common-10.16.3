import * as acceptLanguage from 'accept-language';
import * as i18n from 'i18next';
import { v4 as uuid } from 'uuid';
import Backend from 'i18next-fetch-backend';
import 'isomorphic-fetch';
import { Kafka, Logger } from '../..';

acceptLanguage.languages(['vi', 'en', 'kr', 'zh']);

const getLanguageCode = (acceptLanguageHeader: string): string => {
  try {
    return acceptLanguage.get(acceptLanguageHeader);
  } catch (e) {
    return 'vi';
  }
};

const defaultResources: any = {};

const init = (requestTopic: string, msNames: string[], namsespaces: string[]): void => {
  i18n
    .use(Backend)

  Kafka.getInstance().sendRequest(
    uuid(),
    requestTopic,
    'get:/api/v1/locale',
    {
      msNames: msNames
    })
    .subscribe((message: Kafka.IMessage) => {
      const data = message.data.data;
      if (data.status != null) {
        Logger.error(data.status);
        process.exit(1);
      } else {
        i18n
          .init({
            fallbackLng: 'en',
            preload: ['en', 'kr', 'vi', 'zh'],
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
            ns: namsespaces,
            defaultNS: namsespaces[0],
            fallbackNS: namsespaces.slice(1)
          });
      }

    });
}

const getInstance = (): any => {
  return i18n;
}

export { getLanguageCode, init, getInstance}