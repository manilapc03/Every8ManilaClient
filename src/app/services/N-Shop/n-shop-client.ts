import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ResponseData } from '../../shared/response-data';
import { NShopModel } from '../../model/N-Shop/n-shop.model';

@Injectable({
  providedIn: 'root',
})
export class NShopClient {

  private http = inject(HttpClient);

  public getShopList(pageNumber: number, pageSize: number) {

    return this.http.get<ResponseData<NShopModel>>(
      environment.apiUrl + `/api/N_Shop/GetAllShop?PageNumber=${pageNumber}&PageSize=${pageSize}`
    );

  }

}