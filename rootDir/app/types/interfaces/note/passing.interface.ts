import { IPassingItem } from './passing-item.interface';

export interface IPassing {
  shipmentId: string;
  date: Date;
  dueDate: Date;
  items?: IPassingItem[];
}
