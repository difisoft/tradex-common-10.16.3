export default interface ICommonRequest {
  sourceIp?: string;
  deviceType?: string;
  macAddress?: string;
  platform?: string; // android , ios, web
  appVersion?: string;
  osVersion?: string;
}
