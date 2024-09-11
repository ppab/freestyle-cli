import { IContact } from '../catalog/contact.interface';
import { CommercialEntityCategory } from '../../enums/commercial-entity-category.enum';

export type ICommercialEntityBase = {
  name: string;
  displayName: string;
  category: CommercialEntityCategory;
  taxId: string;
  taxRegime: string;
  customFields: { [key: string]: string };
  contacts: IContact[];
};
