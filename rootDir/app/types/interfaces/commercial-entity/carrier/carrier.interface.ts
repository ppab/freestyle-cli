import { CommercialEntityCategory } from '../../../enums/commercial-entity-category.enum';
import { ICommercialEntityBase } from '../commercial-entity-base.interface';
import { TransportTypeEnum } from '../../../enums/transportTypeEnum';
import { IShipment } from '../../shipment/shipment.interface';

export interface ICarrier extends ICommercialEntityBase {
  category: CommercialEntityCategory.Carrier;
  transportType: TransportTypeEnum;
  shipments?: IShipment;
}
