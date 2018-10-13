import IBaseAfterLoginRequest from './IBaseAfterLoginRequest';

export default interface ILoginNotify extends IBaseAfterLoginRequest {
  serviceName: string;
  username: string;
}