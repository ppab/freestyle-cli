import { IBaseItemWithPrice } from './base-item-with-price.interface';

export interface IPassingItem extends IBaseItemWithPrice {
  invoiceId: string;
}
