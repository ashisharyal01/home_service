import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerApis } from 'src/app/api.constants';
import { TransportService } from '../transport/transport.service';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  constructor(
    private transportService: TransportService,
    private httpClient: HttpClient
  ) { }

  getAllItems() {
    return this.transportService.Read(ServerApis.itemsUrl);
  }

  getItemsByPagination(pageNumber:number, sizeNumber:number, modelName:string = "Item") {
    return this.transportService.Read(`${ServerApis.paginateUrl + `?page=${pageNumber}&size=${sizeNumber}&modelName=${modelName}`}`);
  }

  getItemsById(id: number) {
    return this.transportService.Read(`${ServerApis.itemsUrl}/${id}`);
  }

  createItems(data: string) {
    return this.httpClient.post(ServerApis.itemsUrl, data);
  }


  updateItems(id: number, data: string) {
    return this.httpClient.patch(`${ServerApis.itemsUrl}/${id}`, data);
  }

  deleteItems(itemId: number) {
    return this.transportService.Delete(
      ServerApis.itemsUrl + '/' + itemId
    );
  }

  searchItemData(pageNumber:number, sizeNumber:number,filter: String, modelName:string = "Item") {
    return this.transportService.Read(`${ServerApis.paginateUrl + `?page=${pageNumber}&size=${sizeNumber}&filter=${filter}&modelName=${modelName}`}`
    );
  }
}
