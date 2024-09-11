import { TransportTypeEnum } from '../../enums/transportTypeEnum';
import { ICarrier } from '../commercial-entity/carrier/carrier.interface';
import { ICustomer } from '../commercial-entity/customer.commercial-entity.interface';
import { IFactura } from '../catalog/factura.interface';
import { IProvider } from '../commercial-entity/provider.commercial-entity.interface';
import { IPackingList } from '../document/packing-list.interface';
import { IPassing } from '../note/passing.interface';
import { IInvoice } from '../note/invoice.interface';
import { IDocumentInstructionLetter } from '../document/document-instruction-letter.interface';
import { ICarrierDetails } from '../commercial-entity/carrier/carrier-details.type';
import { IAddress } from '../catalog/addresses.interface';
import { IContact } from '../catalog/contact.interface';
import { IShipmentExpenseNote } from './shipment-expense-note.interface';
import { IShipmentSaleNote } from './shipment-sale-note';
import { IncotermsEnum } from '../../enums/incoterms.enum';
import { IProviderPo } from '../po/provider.po.interface';
import { IGrowerPo } from '../po/grower.po.interface';
import { ICustomerPo } from '../po/customer.po.interface';

export interface IShipment {
  //->CreateForm
  folio: string; // Todo define this with Dany
  shipmentNumber: ''; //

  customer: ICustomer;
  customerContact: IContact;
  shipmentAddress: IAddress; // Automatically

  factura: Pick<IFactura, 'folio'>;
  incoterms: IncotermsEnum;

  shipmentDate: Date;
  shipmentArrivalDate: Date;
  shipmentInstructions: string;
  shipmentHour: string;
  shipmentTemperature: string;

  customsAgentMx: IProvider;
  customsAgentUsa: IProvider;

  //These will be extended:
  transportType: TransportTypeEnum;
  carrier: ICarrier;
  carrierDetails: ICarrierDetails;
  //<-----Finish Create Form
  //Create GrowerNote from this shipment
  growerPO?: IGrowerPo;
  //Create SalesOrder from this shipment
  customerPO?: ICustomerPo;

  ////INVENTORY--->>>
  //Create ExpenseNote from this shipment
  expenseNote?: IShipmentExpenseNote;
  //Create PurchaseOrder from this shipment, this would be a OneToOneRelationShip
  providerPO?: IProviderPo; // This might not be necesary as We are already declaring an Expense Note, however a providerPO might be needed for adding records to the inventory
  /////->>Finish Inventory
  docs: {
    //Create PackingList from this shipment
    packingList?: IPackingList;
    //Create InstructionLetter from this shipment
    instructionLetter?: IDocumentInstructionLetter;
    //Create Passing from this shipment
    passing?: IPassing;
    //Create Invoice from this shipment
    invoice?: IInvoice;
  };
}
