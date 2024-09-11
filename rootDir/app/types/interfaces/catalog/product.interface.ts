import { IProductCategory } from './product-category.interface';

export interface IProduct {
  name: string;
  category: IProductCategory;
}
