import { Category } from './Category';

export interface Item {
  id: number;
  name: string;
  address: string;
  email: string
  categories: Category;
}
