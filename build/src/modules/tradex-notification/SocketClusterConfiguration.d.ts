import IConfiguration from './IConfiguration';
import MethodEnum from './MethodEnum';
export default class EmailConfiguration implements IConfiguration {
    channel: string;
    getMethod(): MethodEnum;
}
