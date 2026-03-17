import { Injectable, inject, effect, signal } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NShopBackUpFlgModel } from '../../model/N-ShopBackUpFlg/n-shopbackupflg.model';
import { ResponseData } from '../../shared/response-data';

@Injectable({
  providedIn: 'root',
})

export class NShopBackUpFlgClient {

  private http = inject(HttpClient);

  public getShopBackUpFlgList(pageNumber: number, pageSize: number)
  {
    return this.http.get<ResponseData<NShopBackUpFlgModel>>(
      environment.apiUrl + `/api/N_ShopBackUpFlg/GetAllShopBackUpFlg?PageNumber=${pageNumber}&PageSize=${pageSize}`
    );
  }

  public getShopBackUpFlgById(id: string)
  {
    return this.http.get<ResponseData<NShopBackUpFlgModel>>(
      environment.apiUrl + `/api/N_ShopBackUpFlg/GetByIdShopBackUpFlg?id=${id}`
    );
  }

  public deleteShopBackUpFlgById(id: string)
  {
    return this.http.delete(
      environment.apiUrl + `/api/N_ShopBackUpFlg/delete?id=${id}`
    );
  }

  public createShopBackUpFlg(model: NShopBackUpFlgModel)
  {
    return this.http.post(
      environment.apiUrl + `/api/N_ShopBackUpFlg/create`, model
    );
  }

  public updateShopBackUpFlg(model: NShopBackUpFlgModel)
  {
    return this.http.put(
      environment.apiUrl + `/api/N_ShopBackUpFlg/update`, model
    );
  }

}