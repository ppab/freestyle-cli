import { TransportTypeEnum } from '../../enums/transportTypeEnum';
import { IShipment } from './shipment.interface';
import { ITruckLoadCarrierDetails } from '../commercial-entity/carrier/carrier-details-truck-load.interface';
import { ITruckLoadCarrier } from '../commercial-entity/truck-load.carrier.commercial-entity.interface';

export interface ITruckLoadShipment extends IShipment {
  transportType: TransportTypeEnum.TruckLoad;
  carrier: ITruckLoadCarrier;
  carrierDetails: ITruckLoadCarrierDetails; // carrier details specific to truck load
}
