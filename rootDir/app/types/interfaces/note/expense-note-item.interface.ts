import { IBaseItemWithPrice } from './base-item-with-price.interface';

export interface IExpenseNoteItem extends IBaseItemWithPrice {
  noteId: string;
}
