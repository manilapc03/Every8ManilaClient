import { Injectable, inject, effect, signal } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NShopTainyuuIdentificationShopModel } from '../../model/N-ShopTainyuuIdentificationShop/n-shoptainyuuidentificationshop.model';
import { ResponseData } from '../../shared/response-data';

@Injectable({
  providedIn: 'root',
})

export class NShopTainyuuIdentificationShopClient {

  private http = inject(HttpClient);

  public getShopTainyuuIdentificationShopList(pageNumber: number, pageSize: number)
  {
    return this.http.get<ResponseData<NShopTainyuuIdentificationShopModel>>(
      environment.apiUrl + `/api/N_Shop_Tainyuu_Identification_shop/GetAllShop_Tainyuu_Identification_shop?PageNumber=${pageNumber}&PageSize=${pageSize}`
    );
  }

  public getShopTainyuuIdentificationShopById(id: string)
  {
    return this.http.get<ResponseData<NShopTainyuuIdentificationShopModel>>(
      environment.apiUrl + `/api/N_ShopTainyuuIdentificationShop/GetByIdShopTainyuuIdentificationShop?id=${id}`
    );
  }

  public deleteShopTainyuuIdentificationShopById(id: string)
  {
    return this.http.delete(
      environment.apiUrl + `/api/N_ShopTainyuuIdentificationShop/delete?id=${id}`
    );
  }

  public createShopTainyuuIdentificationShop(model: NShopTainyuuIdentificationShopModel)
  {
    return this.http.post(
      environment.apiUrl + `/api/N_ShopTainyuuIdentificationShop/create`, model
    );
  }

  public updateShopTainyuuIdentificationShop(model: NShopTainyuuIdentificationShopModel)
  {
    return this.http.put(
      environment.apiUrl + `/api/N_ShopTainyuuIdentificationShop/update`, model
    );
  }

}