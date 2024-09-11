import { IInvoice } from '../note/invoice.interface';
import { Product } from '../../../../dist/frontend/store/product-categories-slice';
import { IProviderPO } from '../po/provider.po.interface';
import { CommercialEntityCategory } from '../../enums/commercial-entity-category.enum';
import { ICommercialEntityBase } from './commercial-entity-base.interface';

export interface IProvider extends ICommercialEntityBase {
  category: CommercialEntityCategory.Provider;
  products: Product[];
  invoices: IInvoice[];
  purchaseOrders: IProviderPO[];
}
