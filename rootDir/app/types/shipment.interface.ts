import { ICustomerPurchaseOrder } from './customer-purchase-order.interface';
import { ICustomer } from './commercial-entity.interface';
import { IPackingList } from './packing-list.interface';
import { InstructionLetter } from './instruction-letter.interface';
import { IInvoice } from './invoice.interface';
import { IPassing } from './passing.interface';
import { IGrowerNote } from './grower-note.interface';

export interface IShipment {
  shipmentId: string;
  customer: ICustomer;
  purchaseOrder: ICustomerPurchaseOrder;
  growerNote: IGrowerNote;
  invoice: IInvoice;
  passing: IPassing;
  packingList: IPackingList;
  instructionLetter: InstructionLetter;
}
