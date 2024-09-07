import { IContact } from './contact.interface';
import { ICustomerPurchaseOrder } from './customer-purchase-order.interface';
import { IInvoice } from './invoice.interface';
import { Product } from '../../dist/frontend/store/product-categories-slice';
import { IShipment } from './shipment.interface';
import { IProviderPurchaseOrder } from './provider-purchase-order.interface';

enum CommercialEntityCategory {
  Customer = 'Customer',
  Grower = 'Grower',
  Carrier = 'Carrier',
  Provider = 'Provider',
}

export type ICommercialInterface = {
  name: string;
  displayName: string;
  category: CommercialEntityCategory;
  taxId: string;
  taxRegime: string;
  customFields: { [key: string]: string };
  contacts: IContact[];
};

export type CarrierCaja = {
  name: string;
  placa: string;
};

export type CarrierTracto = {
  name: string;
  placa: string;
};

export interface ICustomer extends ICommercialInterface {
  category: CommercialEntityCategory.Customer;
  products: Product[];
  shipments: IShipment[];
  invoices: IInvoice[];
  purchaseOrders: ICustomerPurchaseOrder[];
}

export interface IProvider extends ICommercialInterface {
  category: CommercialEntityCategory.Provider;
  products: Product[];
  invoices: IInvoice[];
  purchaseOrders: IProviderPurchaseOrder[];
}

export interface IGrower extends ICommercialInterface {
  category: CommercialEntityCategory.Grower;
  products: Product[];
  shipments: IShipment[];
  invoices: IInvoice[];
}

export interface ICarrier extends ICommercialInterface {
  category: CommercialEntityCategory.Carrier;
  customFields: {
    scac: string;
    caat: string;
  };
  tractos: CarrierTracto[];
  cajas: CarrierCaja[];
  shipments: IShipment[];
}
