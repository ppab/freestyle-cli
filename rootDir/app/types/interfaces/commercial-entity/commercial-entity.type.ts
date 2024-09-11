import { IGrower } from './grower.commercial-entity.interface';
import { ICustomer } from './customer.commercial-entity.interface';
import { IProvider } from './provider.commercial-entity.interface';
import { ITenant } from './tenant.commercial-entity.interface';

export type CommercialEntity = IGrower | ICustomer | IProvider | ITenant;
