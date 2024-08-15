import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerApis } from 'src/app/api.constants';
import { TransportService } from '../transport/transport.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerTransactionService {

  constructor(private transportService: TransportService, private httpClient: HttpClient) { }

  getCustomerTransaction() {
    return this.transportService.Read(`${ServerApis.customerTransactionUrl}`)
  }

  addCustomerTransaction(data: any) {
    return this.httpClient.post(ServerApis.customerTransactionUrl, data);
  }

  viewCustomerTransactionById(id: string) {
    return this.transportService.Read(`${ServerApis.customerTransactionUrl}/${id}`);
  }

  searchCustomerTransactionData(pageNumber:number, sizeNumber:number,filter: String, modelName:string = "Transaction") {
    return this.transportService.Read(`${ServerApis.paginateUrl + `?page=${pageNumber}&size=${sizeNumber}&filter=${filter}&modelName=${modelName}`}`
    );
  }


  // searchPartyPurchaseTransactions(pageSize: number, pageNo: number, query: string = '') {
  //   return this.transportService.Read(
  //     ServerApis.partyPurchaseTransactionUrl +
  //     `?size=${pageSize}&page=${pageNo}&search=${query}`
  //   );
  // }

  // searchPartyPurchaseTransactionsByDate(pageSize: number, pageNo: number, query: string = '', startDate: string = '', endDate: string = '', party: string) {
  //   return this.transportService.Read(
  //     ServerApis.partyPurchaseTransactionUrl +
  //     `?size=${pageSize}&page=${pageNo}&search=${query}&startDate=${startDate}&endDate=${endDate}&party=${party}`
  //   );
  // }

  // searchPartyPurchaseInvoiceByDate(pageSize: number, pageNo: number, query: string = '', startDate: string = '', endDate: string = '', party: string) {
  //   return this.transportService.Read(
  //     ServerApis.partyPurchaseUrl +
  //     `?size=${pageSize}&page=${pageNo}&search=${query}&startDate=${startDate}&endDate=${endDate}&party=${party}`
  //   );
  // }
}
