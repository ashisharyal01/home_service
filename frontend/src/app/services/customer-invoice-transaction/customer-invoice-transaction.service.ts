import { Injectable } from '@angular/core';
import { ServerApis } from 'src/app/api.constants';
import { TransportService } from '../transport/transport.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerInvoiceTransactionService {

  constructor(private transportService: TransportService,) { }

  searchCustomerInvoiceDetails(id: number, filterOrder: string = '', orderStartDate: string = '', orderEndDate: string = "") {
    return this.transportService.Read(
      ServerApis.customerUrl +
      `/order/${id}?filterOrder=${filterOrder}&orderStartDate=${orderStartDate}&orderEndDate=${orderEndDate}`
    );
  }

  searchCustomerTransactionDetails(id: number, filterTransaction: string = '', transactionStartDate: string = '', transactionEndDate: string = "") {
    return this.transportService.Read(
      ServerApis.customerUrl +
      `/transaction/${id}?filterTransaction=${filterTransaction}&transactionStartDate=${transactionStartDate}&transactionEndDate=${transactionEndDate}`
    );
  }
}
