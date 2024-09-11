import { IBaseItemWithPrice } from './base-item-with-price.interface';

export interface IInvoiceItem extends IBaseItemWithPrice {
  invoiceId: string;
}
