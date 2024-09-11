import { ICustomerPO } from '../po/customer.po.interface';
import { IInvoice } from '../note/invoice.interface';
import { Product } from '../../../../dist/frontend/store/product-categories-slice';
import { IShipment } from '../shipment/shipment.type';
import { CommercialEntityCategory } from '../../enums/commercial-entity-category.enum';
import { ICommercialEntityBase } from './commercial-entity-base.interface';

export interface ICustomer extends ICommercialEntityBase {
  category: CommercialEntityCategory.Customer;
  invoices?: IInvoice[];
  purchaseOrders?: ICustomerPO[];
  products?: Product[];
  shipments?: IShipment[];
}
