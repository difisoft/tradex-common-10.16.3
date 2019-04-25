import IConfiguration from './IConfiguration';
import MethodEnum from './MethodEnum';

export default class EmailConfiguration implements IConfiguration {
  public channel: string;

  public getMethod(): MethodEnum {
    return MethodEnum.EMAIL;
  }
}