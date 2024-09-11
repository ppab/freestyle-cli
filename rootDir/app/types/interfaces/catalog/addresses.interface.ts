import { AddressCategoryEnum } from '../../enums/address-category.enum';

export interface IAddress {
  contactId: string;
  category: AddressCategoryEnum;
  number: string;
  street: string;
  interior?: string;
  zip: string;
  city: string;
  state: string;
  country: string;
}
