import { TransportTypeEnum } from '../../enums/transportTypeEnum';
import { ICarrier } from './carrier/carrier.interface';
import { ICarrierVehicle } from './carrier/carrier-vehicle.interface';
import { ICarrierContainer } from './carrier/carrier-container.interface';

export interface ITruckLoadCarrier extends ICarrier {
  transportType: TransportTypeEnum.TruckLoad;
  customFields: {
    scac: string;
    caat: string;
  };
  vehicles?: ICarrierVehicle[];
  containers?: ICarrierContainer[];
}
