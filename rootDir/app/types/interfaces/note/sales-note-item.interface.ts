import { IBaseItemWithPrice } from './base-item-with-price.interface';

export interface ISaleNoteItem extends IBaseItemWithPrice {
  saleNoteId: string;
}
