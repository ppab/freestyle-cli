import { ITenant } from '../commercial-entity/tenant.commercial-entity.interface';
import { ICustomer } from '../commercial-entity/customer.commercial-entity.interface';
import { IAddress } from '../catalog/addresses.interface';
import { IShipment, IShipment2 } from '../shipment/shipment.type';

export interface IDocumentInstructionLetter {
  tenant: ITenant;
  customer: ICustomer;
  shippingAddress: IAddress;
  shipmentDate: Pick<IShipment2, 'shipmentDate'>;
}
