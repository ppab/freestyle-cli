import { ICustomerPO } from '../po/customer.po.interface';
import { IPackingList } from '../document/packing-list.interface';
import { IDocumentInstructionLetter } from '../document/document-instruction-letter.interface';
import { IInvoice } from '../note/invoice.interface';
import { IPassing } from '../note/passing.interface';
import { IGrowerNote } from '../note/grower-note.interface';
import { ICustomer } from '../commercial-entity/customer.commercial-entity.interface';

import { ITruckLoadShipment } from './truck-load.shipment.interface';

// export interface IShipment {
//   id: string;
//   customer: ICustomer;
//   purchaseOrder: ICustomerPO;
//   growerNote: IGrowerNote;
//   invoice: IInvoice;
//   passing: IPassing;
//   packingList: IPackingList;
//   instructionLetter: IDocumentInstructionLetter;
// }

export type IShipment2 = ITruckLoadShipment;
