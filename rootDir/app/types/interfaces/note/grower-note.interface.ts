import { IDocument } from '../document/document.interface';
import { IGrowerNoteItem } from './grower-note-item.interface';
import { IGrower } from '../commercial-entity/grower.commercial-entity.interface';

export interface IGrowerNote {
  // Esta nota la va a dar de alta el de logistica sin precio,
  // después se actualizan los precios y se imprimen.
  grower: IGrower;
  folio: string;
  url: string;
  customFields: { [key: string]: string };
  items?: IGrowerNoteItem[];
  documents?: IDocument[];
}
