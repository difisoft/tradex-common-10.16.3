import IParamError from "./IParamError";

export default interface IStatus {
  code: string,
  messageParams?: string[],
  params?: IParamError[],
}