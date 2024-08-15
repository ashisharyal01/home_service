import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerApis } from 'src/app/api.constants';
import { FiscalYear } from 'src/app/models/FiscalYear';
import { TransportService } from '../transport/transport.service';

@Injectable({
  providedIn: 'root',
})
export class FiscalYearService {
  constructor(
    private transportService: TransportService,
    private httpClient: HttpClient
  ) { }

  getAllFiscalYears() {
    return this.transportService.Read(ServerApis.fiscalUrl);
  }

  deleteYearData(id: number) {
    return this.transportService.Delete(ServerApis.fiscalUrl + '/' + id);
  }

  updateYear(id: number, data: string) {
    return this.httpClient.patch(ServerApis.fiscalUrl + '/' + id, data);
  }

  changeStatusOfFiscalYear(id: number) {
    return this.httpClient.patch(
      ServerApis.fiscalUrl + '/updateFiscalYearState/' + id,
      ''
    );
  }

  createYear(data: string) {
    return this.httpClient.post(ServerApis.fiscalUrl, data);
  }

  getActiveFiscalYearById(id: number) {
    return this.transportService.Read(ServerApis.fiscalUrl + '/' + id);
  }
}
