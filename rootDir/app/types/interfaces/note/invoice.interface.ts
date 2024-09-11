import { IInvoiceItem } from './invoice-item.interface';

export interface IInvoice {
  shipmentId: string;
  date: Date;
  dueDate: Date;
  items?: IInvoiceItem[];
}
