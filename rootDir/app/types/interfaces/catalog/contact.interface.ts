import { IAddress } from './addresses.interface';

export interface IContact {
  displayName: string;
  description: string;
  //Person
  firstName?: string;
  lastName?: string;
  email?: string;
  jobTitle?: string;
  department?: string;
  //Office
  office?: string;
  officePhone?: string;
  mobilePhone?: string;
  addresses?: IAddress[];

  customFields?: { [key: string]: string };
  //ContactCategory? maybe we should have specific customFields for each contactCategory

  //Picture?// maybe we can add this field when adding the doc capabilites.
  image?: string;
}
