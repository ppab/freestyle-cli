import { IDocument } from '../document/document.interface';
import { ICustomer } from '../commercial-entity/customer.commercial-entity.interface';
import { ITenant } from '../commercial-entity/tenant.commercial-entity.interface';
import { IPoRecord } from './po-record.interface';
import { IContact } from '../catalog/contact.interface';

export interface IPo {
  tenant: ITenant;
  commercialEntity: ICustomer;
  contact: IContact;
  records?: IPoRecord[];
  document?: IDocument;
}
