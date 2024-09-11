import { Product } from '../../../../dist/frontend/store/product-categories-slice';
import { IUnit } from '../catalog/unit.interface';

export interface IBaseNoteItem {
  unit: IUnit;
  product: Product;
  quantity: number;
}
