import { IPoRecord } from './po-record.interface';

export interface ICustomerPoRecord extends IPoRecord {
  customerPoId: number;
}
