import { IFactura } from './factura.interface';
import { ICarrier, IProvider } from './commercial-entity.interface';

enum Transport {
  TruckLoad = 'TruckLoad',
}

export interface IPackingList {
  transport: Transport;
  factura: IFactura;
  aduanalMx: IProvider;
  aduanalUsa: IProvider;
  carrier: ICarrier;
  carrierInfo: {
    vehichle: string;
    containerNumber: string;
    carrierName: string;
    tracto: ITracto;
  };
}
