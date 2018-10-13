import ITemplateData from './ITemplateData';
export default class OrderResultNotificationData implements ITemplateData {
    accountNumber: string;
    subNumber: string;
    stockCode: string;
    orderQuantity: string;
    orderPrice: string;
    sellBuyType: string;
    orderType: string;
    getTemplate(): string;
}
