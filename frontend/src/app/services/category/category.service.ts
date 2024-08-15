import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerApis } from 'src/app/api.constants';
import { TransportService } from '../transport/transport.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private transportService: TransportService,
    private httpClient: HttpClient
  ) { }

  getAllCategories() {
    return this.transportService.Read(ServerApis.categoryUrl);
  }

  getCategoriesByPagination(pageNumber:number, sizeNumber:number, modelName:string = "Category") {
    return this.transportService.Read(`${ServerApis.paginateUrl + `?page=${pageNumber}&size=${sizeNumber}&modelName=${modelName}`}`);
  }

  getCategoryById(id: number) {
    return this.transportService.Read(`${ServerApis.categoryUrl}/${id}`);
  }

  createCategory(data: string) {
    return this.httpClient.post(ServerApis.categoryUrl, data);
  }

  updateCategory(id: number, data: string) {
    return this.httpClient.patch(`${ServerApis.categoryUrl}/${id}`, data);
  }

  deleteCategory(categoryId: number) {
    return this.transportService.Delete(
      ServerApis.categoryUrl + '/' + categoryId
    );
  }

  searchCategoryData(pageNumber:number, sizeNumber:number,filter: String, modelName:string = "Category") {
    return this.transportService.Read(`${ServerApis.paginateUrl + `?page=${pageNumber}&size=${sizeNumber}&filter=${filter}&modelName=${modelName}`}`
    );
  }
}
