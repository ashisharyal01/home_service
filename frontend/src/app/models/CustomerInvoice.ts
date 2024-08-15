import { Customer } from './Customer';
import { FiscalYear } from './FiscalYear';
import { OderedItem } from './OrderedItems';
import { User } from './User';

export interface CustomerInvoice {
  id: number;
  orderLocation: string;
  workStatus: string;
  orderDate: Date;
  totalOrderAmount: number;
  orderInvoiceNo: string;
  customer: Customer;
  customerId: number;
  vatAmount: number;
  discountAmount: number;
  grandTotal: number;
  fiscalYear: FiscalYear;
  user: User;
  OrderedItems: OderedItem
  remarks: string;
}
