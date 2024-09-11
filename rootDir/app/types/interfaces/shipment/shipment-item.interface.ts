import { IBaseNoteItem } from '../note/base-note-item.interface';

export interface IShipmentItem extends IBaseNoteItem {
  packingListId: string;
  kg: number;
  price: number;
}
