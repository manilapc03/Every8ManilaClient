import { Injectable, inject, effect, signal } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NShopBackModel } from '../../model/N-ShopBack/n-shopback.model';
import { ResponseData } from '../../shared/response-data';

@Injectable({
  providedIn: 'root',
})

export class NShopBackClient {

  private http = inject(HttpClient);

  public getShopBackList(pageNumber: number, pageSize: number)
  {
    return this.http.get<ResponseData<NShopBackModel>>(
      environment.apiUrl + `/api/N_ShopBack/GetAllShopBack?PageNumber=${pageNumber}&PageSize=${pageSize}`
    );
  }

  public getShopBackById(id: string)
  {
    return this.http.get<ResponseData<NShopBackModel>>(
      environment.apiUrl + `/api/N_ShopBack/GetByIdShopBack?id=${id}`
    );
  }

  public deleteShopBackById(id: string)
  {
    return this.http.delete(
      environment.apiUrl + `/api/N_ShopBack/delete?id=${id}`
    );
  }

  public createShopBack(model: NShopBackModel)
  {
    return this.http.post(
      environment.apiUrl + `/api/N_ShopBack/create`, model
    );
  }

  public updateShopBack(model: NShopBackModel)
  {
    return this.http.put(
      environment.apiUrl + `/api/N_ShopBack/update`, model
    );
  }

}