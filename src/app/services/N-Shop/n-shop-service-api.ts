import { map, Observable, take, tap, delay } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Injectable, inject, signal, computed, WritableSignal } from '@angular/core';
import { NShopClient } from './n-shop-client';
import { NShopModel } from '../../model/N-Shop/n-shop.model';
import { ResponseData } from '../../shared/response-data';

@Injectable({
  providedIn: 'root',
})
export class NShopServiceAPI {

  shopClient = inject(NShopClient);

  dataList = signal<ResponseData<NShopModel>>({
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

  data = signal<ResponseData<NShopModel>>({
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

  public getShopList(pageNumber: number, pageSize: number) {
    return this.shopClient.getShopList(pageNumber, pageSize)
      //.pipe(delay(1000))
      .subscribe({
        next: (resp: ResponseData<NShopModel>) => {
          this.dataList.set(resp);
        },
        error: (err) => console.log(err.error),
        complete: () => console.log('Done.'),
      });
  }

  public getShopById(id: string) {
    return this.shopClient.getShopById(id)
      //.pipe(delay(1000))
      .subscribe({
        next: (resp: ResponseData<NShopModel>) => {
          this.data.set(resp);
        },
        error: (err) => console.log(err.error),
        complete: () => console.log('Done.'),
      });
  }

  public deleteShopById(id: string) {
    this.shopClient.deleteShopById(id)
      .subscribe({
        error: (err) => alert("Unabled to delete record with id " + id + ":" + err.error),
        complete: () => alert(id + " has been deleted."),
      });
  }

  public createShop(model: NShopModel) {
    this.shopClient.createShop(model)
      .subscribe({
        error: (err) => alert("Unabled to save record : " + err.error),
        complete: () => alert(" Shop has been created."),
      });
  }

  public updateShop(model: NShopModel) {
    this.shopClient.updateShop(model)
      .subscribe({
        error: (err) => alert("Unabled to save record : " + err.error),
        complete: () => alert(" Shop has been updated."),
      });
  }

}