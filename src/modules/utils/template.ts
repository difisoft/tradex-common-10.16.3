import { v4 as uuid } from 'uuid';
import { Kafka, Logger } from '../..';

let templateResources: any = [];

const init = (msNames: string, requestTopic: string = 'configuration', uri: string = '/api/v1/template'): void => {
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
        templateResources = message.data.data;
      }
    });
}

const getTemplateResources = (): any => {
  return templateResources;
}

export { init, getTemplateResources }