import { CommercialEntityCategory } from '../../enums/commercial-entity-category.enum';
import { CommercialEntity } from '../commercial-entity/commercial-entity.type';

export interface IFactura {
  folio: string; // this could be the PK
  commercialEntityCategory: CommercialEntityCategory;
  commercialEntity: CommercialEntity;
  url: string;
}
