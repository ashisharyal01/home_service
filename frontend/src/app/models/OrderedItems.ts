import { Item } from "./Items";

export interface OderedItem {
  itemLists: Item
  id: number;
  orderId: number;
  itemId: number;
  itemPrice: number;
  quantity: number;
}
