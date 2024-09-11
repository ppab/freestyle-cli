import { IInvoice } from '../note/invoice.interface';
import { Product } from '../../../../dist/frontend/store/product-categories-slice';
import { IShipment } from '../shipment/shipment.type';
import { CommercialEntityCategory } from '../../enums/commercial-entity-category.enum';
import { ICommercialEntityBase } from './commercial-entity-base.interface';

export interface IGrower extends ICommercialEntityBase {
  category: CommercialEntityCategory.Grower;
  products: Product[];
  shipments: IShipment[];
  invoices: IInvoice[];
}
