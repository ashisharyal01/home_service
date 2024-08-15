import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerApis } from 'src/app/api.constants';
import { TransportService } from '../transport/transport.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private transportService: TransportService,
    private httpClient: HttpClient
  ) { }

  changeUserPassword(data: any) {
    return this.transportService.Update(
      data,
      ServerApis.changePasswordUrl + '/'
    );
  }

  getAllUser() {
    return this.transportService.Read(`${ServerApis.userUrl}`);
  }

  getUsersByPagination(pageNumber:number, sizeNumber:number, modelName:string = "User") {
    return this.transportService.Read(`${ServerApis.paginateUrl + `?page=${pageNumber}&size=${sizeNumber}&modelName=${modelName}`}`);
  }

  createUser(data: string) {
    return this.httpClient.post(ServerApis.userUrl + '/sign-up', data);
  }

  updateUser(id: number, data: string) {
    return this.httpClient.patch(`${ServerApis.userUrl}/${id}`, data);
  }

  getUserById(userId: number) {
    return this.transportService.Read(`${ServerApis.userUrl}/${userId}`);
  }

  deleteUser(userId: number) {
    return this.transportService.Delete(`${ServerApis.userUrl}/${userId}`);
  }

  searchUserData(pageNumber:number, sizeNumber:number,filter: String, modelName:string = "User") {
    return this.transportService.Read(`${ServerApis.paginateUrl + `?page=${pageNumber}&size=${sizeNumber}&filter=${filter}&modelName=${modelName}`}`
    );
  }
}
