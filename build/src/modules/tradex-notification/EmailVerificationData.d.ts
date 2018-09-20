import ITemplateData from "./ITemplateData";
export default class EmailVerificationData implements ITemplateData {
    activationCode: string;
    expirationTime: string;
    getTemplate(): string;
}
