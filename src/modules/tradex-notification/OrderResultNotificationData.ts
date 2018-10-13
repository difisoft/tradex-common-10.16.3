import ITemplateData from './ITemplateData';

export default class OrderResultNotificationData implements ITemplateData {
  public accountNumber: string;
  public subNumber: string;
  public stockCode: string;
  public orderQuantity: string;
  public orderPrice: string;
  public sellBuyType: string;
  public orderType: string;

  public getTemplate(): string {
    return 'order_result_notification';
  }
}