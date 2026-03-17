import { map, Observable, take, tap, delay } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Injectable, inject, signal, computed, WritableSignal } from '@angular/core';
import { NShopTainyuuIdentificationShopClient } from './n-shoptainyuuidentificationshop-client';
import { NShopTainyuuIdentificationShopModel } from '../../model/N-ShopTainyuuIdentificationShop/n-shoptainyuuidentificationshop.model';
import { ResponseData } from '../../shared/response-data';

@Injectable({
  providedIn: 'root',
})
export class NShopTainyuuIdentificationShopServiceAPI {

  shopTainyuuIdentificationShopClient = inject(NShopTainyuuIdentificationShopClient);

  dataList = signal<ResponseData<NShopTainyuuIdentificationShopModel>>({
    data: [],
    currentPage: 0,
    hasNext: false,
    hasPrevious: false,
    message: "",
    status: "",
    pageSize: 10,
    totalCount: 0,
    totalPages: 0,
  });

  data = signal<ResponseData<NShopTainyuuIdentificationShopModel>>({
    data: [],
    currentPage: 0,
    hasNext: false,
    hasPrevious: false,
    message: "",
    status: "",
    pageSize: 10,
    totalCount: 0,
    totalPages: 0,
  });

  public getShopTainyuuIdentificationShopList(pageNumber: number, pageSize: number) {
    return this.shopTainyuuIdentificationShopClient.getShopTainyuuIdentificationShopList(pageNumber, pageSize)
      //.pipe(delay(1000))
      .subscribe({
        next: (resp: ResponseData<NShopTainyuuIdentificationShopModel>) => {
          this.dataList.set(resp);
        },
        error: (err) => console.log(err.error),
        complete: () => console.log('Done.'),
      });
  }

  public getShopTainyuuIdentificationShopById(id: string) {
    return this.shopTainyuuIdentificationShopClient.getShopTainyuuIdentificationShopById(id)
      //.pipe(delay(1000))
      .subscribe({
        next: (resp: ResponseData<NShopTainyuuIdentificationShopModel>) => {
          this.data.set(resp);
        },
        error: (err) => console.log(err.error),
        complete: () => console.log('Done.'),
      });
  }

  public deleteShopTainyuuIdentificationShopById(id: string) {
    this.shopTainyuuIdentificationShopClient.deleteShopTainyuuIdentificationShopById(id)
      .subscribe({
        error: (err) => alert("Unabled to delete record with id " + id + ":" + err.error),
        complete: () => alert(id + " has been deleted."),
      });
  }

  public createShoTainyuuIdentificationShop(model: NShopTainyuuIdentificationShopModel) {
    this.shopTainyuuIdentificationShopClient.createShopTainyuuIdentificationShop(model)
      .subscribe({
        error: (err) => alert("Unabled to save record : " + err.error),
        complete: () => alert(" ShopTainyuuIdentificationShop has been created."),
      });
  }

  public updateShopTainyuuIdentificationShop(model: NShopTainyuuIdentificationShopModel) {
    this.shopTainyuuIdentificationShopClient.updateShopTainyuuIdentificationShop(model)
      .subscribe({
        error: (err) => alert("Unabled to save record : " + err.error),
        complete: () => alert(" ShopTainyuuIdentificationShop has been updated."),
      });
  }

}