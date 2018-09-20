import { v4 as uuid } from 'uuid';
import { Kafka, Logger } from '../..';

let templateResources: any = [];

const init = (msNames: string, requestTopic: string = 'configuration'): void => {
  Kafka.getInstance().sendRequest(
    uuid(),
    requestTopic,
    'get:/api/v1/template',
    {
      msNames: msNames
    })
    .subscribe((message: Kafka.IMessage) => {
      if (message.data.status != null) {
        Logger.error(message.data.status);
        process.exit(1);
      } else {
        templateResources = message.data.data;
      }
    });
}

const getTemplateResources = (): any => {
  return templateResources;
}

export { init, getTemplateResources }