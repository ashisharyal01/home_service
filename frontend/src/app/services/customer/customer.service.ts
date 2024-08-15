import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerApis } from 'src/app/api.constants';
import { TransportService } from '../transport/transport.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private transportService: TransportService,
    private httpClient: HttpClient
  ) { }



  getAllCustomers() {
    return this.transportService.Read(ServerApis.customerUrl);
  }

  getCustomersByPagination(pageNumber:number, sizeNumber:number, modelName:string = "Customer") {
    return this.transportService.Read(`${ServerApis.paginateUrl + `?page=${pageNumber}&size=${sizeNumber}&modelName=${modelName}`}`);
  }

  getCustomersById(id: number) {
    return this.transportService.Read(`${ServerApis.customerUrl}/${id}`);
  }

  createCustomers(data: string) {
    return this.httpClient.post(ServerApis.customerUrl, data);
  }

  updateCustomers(id: number, data: string) {
    return this.httpClient.patch(`${ServerApis.customerUrl}/${id}`, data);
  }

  deleteCustomers(customerId: number) {
    return this.transportService.Delete(
      ServerApis.customerUrl + '/' + customerId
    );
  }

  searchCustomerData(pageNumber:number, sizeNumber:number,filter: String, modelName:string = "Customer") {
    return this.transportService.Read(`${ServerApis.paginateUrl + `?page=${pageNumber}&size=${sizeNumber}&filter=${filter}&modelName=${modelName}`}`
    );
  }
}
