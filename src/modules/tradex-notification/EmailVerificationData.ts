import ITemplateData from "./ITemplateData";

export default class EmailVerificationData implements ITemplateData {
  public activationCode: string;
  public expirationTime: string;

  public getTemplate(): string {
    return "alarm_notification";
  }
}