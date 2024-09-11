import { ISaleNoteItem } from './sales-note-item.interface';
import { ICustomer } from '../commercial-entity/customer.commercial-entity.interface';

export interface ISaleNote {
  customer: ICustomer;
  items?: ISaleNoteItem;
}
