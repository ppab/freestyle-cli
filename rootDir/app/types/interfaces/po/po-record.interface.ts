import { IUnit } from '../catalog/unit.interface';
import { Product } from '../../../../dist/frontend/store/product-categories-slice';

export interface IPoRecord {
  unit: IUnit;
  product: Product;
  quantity: number;
  price: number;
}
