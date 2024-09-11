import { IFactura } from '../catalog/factura.interface';
import { IProvider } from '../commercial-entity/provider.commercial-entity.interface';
import { ICarrier } from '../commercial-entity/carrier/carrier.interface';
import { ICarrierVehicle } from '../commercial-entity/carrier/carrier-vehicle.interface';
import { TransportTypeEnum } from '../../enums/transportTypeEnum';
import { ICarrierContainer } from '../commercial-entity/carrier/carrier-container.interface';
import { IShipmentItem } from '../shipment/shipment-item.interface';
import { ICustomer } from '../commercial-entity/customer.commercial-entity.interface';
import { IContact } from '../catalog/contact.interface';
import { IncotermsEnum } from '../../enums/incoterms.enum';
import { ITenant } from '../commercial-entity/tenant.commercial-entity.interface';
import { IAddress } from '../catalog/addresses.interface';

export interface IPackingList {
  shipmentId: string;
  tenant: ITenant;
  //From Shipment
  folio: string;
  customer: ICustomer;
  factura: Pick<IFactura, 'folio'>;
  customsMx: IProvider;
  customsUsa: IProvider;
  carrier: ICarrier;
  carrierDriver: IContact;
  carrierVehicle: ICarrierVehicle;
  carrierContainer: ICarrierContainer;

  shipmentInstructions: string;
  shipmentDate: Date;
  shipmentArrivalDate: Date;
  shipmentIncoterms: IncotermsEnum;
  shipmentHour: string;
  shipmentTransportType: TransportTypeEnum;
  shipmentObservations: string;
  shipmentHandling: string;
  ShipmentPalletSpecs: string;

  temperature: string;
  packingListItems?: IShipmentItem[];
}

export interface IPackingList2 {
  shipmentId: string;
  folio: string;
}
