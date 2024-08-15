import { PaymentStatusType } from "../enum_type/PaymentStatus.type";
import { Customer } from "./Customer";
import { FiscalYear } from "./FiscalYear";
import { User } from "./User";

export interface CustomerTransaction {
    id: number;
    paidAmount: number;
    paymentMethod: string;
    transactionRemarks: string;
    orderTransactionNo: string;
    transactionDate: Date;
    customer: Customer;
    RegisterUser: User;
    fiscalYearTransaction: FiscalYear
}