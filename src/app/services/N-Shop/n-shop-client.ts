import { Injectable, inject, effect, signal } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NShopModel } from '../../model/N-Shop/n-shop.model';
import { ResponseData } from '../../shared/response-data';

@Injectable({
  providedIn: 'root',
})

export class NShopClient {

  private http = inject(HttpClient);

  public getShopList(pageNumber: number, pageSize: number)
  {
    return this.http.get<ResponseData<NShopModel>>(
      environment.apiUrl + `/api/N_Shop/GetAllShop?PageNumber=${pageNumber}&PageSize=${pageSize}`
    );
  }

  public getShopById(id: string)
  {
    return this.http.get<ResponseData<NShopModel>>(
      environment.apiUrl + `/api/N_Shop/GetByIdShop?id=${id}`
    );
  }

  public deleteShopById(id: string)
  {
    return this.http.delete(
      environment.apiUrl + `/api/N_Shop/delete?id=${id}`
    );
  }

  public createShop(model: NShopModel)
  {
    return this.http.post(
      environment.apiUrl + `/api/N_Shop/create`, model
    );
  }

  public updateShop(model: NShopModel)
  {
    return this.http.put(
      environment.apiUrl + `/api/N_Shop/update`, model
    );
  }

}