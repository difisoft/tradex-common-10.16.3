import IHeaders from './IHeaders';
import ICommonRequest from "./ICommonRequest";
export default interface IDataRequest extends ICommonRequest {
    headers?: IHeaders;
}
