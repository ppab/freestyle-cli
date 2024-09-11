import { IBaseNoteItem } from './base-note-item.interface';

export interface IBaseItemWithPrice extends IBaseNoteItem {
  price: number;
}
