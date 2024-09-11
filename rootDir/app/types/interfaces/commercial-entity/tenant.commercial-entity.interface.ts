import { CommercialEntityCategory } from '../../enums/commercial-entity-category.enum';
import { ICommercialEntityBase } from './commercial-entity-base.interface';

export interface ITenant extends ICommercialEntityBase {
  category: CommercialEntityCategory.Tenant;
}
