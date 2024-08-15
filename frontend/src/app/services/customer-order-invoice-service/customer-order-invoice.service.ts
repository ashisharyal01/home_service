import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerApis } from 'src/app/api.constants';
import { TransportService } from '../transport/transport.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerOrderInvoiceService {

  constructor(private transportService: TransportService, private httpClient: HttpClient) { }

  getCustomerInvoicePagination() {
    return this.transportService.Read(`${ServerApis.customerOrderInvoiceUrl}`);
  }

  getCustomerInvoiceById(id: number) {
    return this.transportService.Read(`${ServerApis.customerOrderInvoiceUrl}/${id}`);
  }

  // getInterentCustomerTransactionById(id: string) {
  //   return this.transportService.Read(`${ServerApis.internetCustomerInvoiceTransactionUrl}/${id}`);
  // }

  createCustomerInvoice(req: any) {
    return this.httpClient.post(ServerApis.customerOrderInvoiceUrl, req);
  }

  // createCustomerTransaction(req) {
  //   return this.transportService.Create(req, ServerApis.customerInvoiceTransactionUrl);
  // }

  updateCustomerInvoice(id: number, data: string) {
    return this.httpClient.patch(`${ServerApis.customerOrderInvoiceUrl}/${id}`, data);
  }

  deleteCustomerInvoice(id: number) {
    return this.transportService.Delete(`${ServerApis.customerOrderInvoiceUrl}/${id}`);
  }

  searchCustomerInvoiceData(pageNumber:number, sizeNumber:number,filter: String, modelName:string = "Invoice") {
    return this.transportService.Read(`${ServerApis.paginateUrl + `?page=${pageNumber}&size=${sizeNumber}&filter=${filter}&modelName=${modelName}`}`
    );
  }

  // searchCustomerInviceData(pageSize: number, pageNo: number, query: string) {
  //   return this.transportService.Read(
  //     ServerApis.customerOrderInvoiceUrl +
  //     `?size=${pageSize}&page=${pageNo}&search=${query}`
  //   );
  // }

  // searchInternetCustomerInvoiceByDate(pageSize: number, pageNo: number, query: string = '', startDate: string = '', endDate: string = '', customer: string) {
  //   return this.transportService.Read(
  //     ServerApis.internetInvoiceUrls +
  //     `?size=${pageSize}&page=${pageNo}&search=${query}&startDate=${startDate}&endDate=${endDate}&customer=${customer}`
  //   );
  // }

  // searchInternetCustomerTransactions(pageSize: number, pageNo: number, query: string = '') {
  //   return this.transportService.Read(
  //     ServerApis.internetCustomerInvoiceTransactionUrl +
  //     `?size=${pageSize}&page=${pageNo}&search=${query}`
  //   );
  // }

  // searchInternetCustomerTransactionsByDate(pageSize: number, pageNo: number, query: string = '', startDate: string = '', endDate: string = '', customer: string) {
  //   return this.transportService.Read(
  //     ServerApis.internetCustomerInvoiceTransactionUrl +
  //     `?size=${pageSize}&page=${pageNo}&search=${query}&startDate=${startDate}&endDate=${endDate}&customer=${customer}`
  //   );
  // }
}
