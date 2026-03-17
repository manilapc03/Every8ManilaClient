import { map, Observable, take, tap, delay } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Injectable, inject, signal, computed, WritableSignal } from '@angular/core';
import { NShopBackClient } from './n-shopback-client';
import { NShopBackModel } from '../../model/N-ShopBack/n-shopback.model';
import { ResponseData } from '../../shared/response-data';

@Injectable({
  providedIn: 'root',
})
export class NShopBackServiceAPI {

  shopBackClient = inject(NShopBackClient);

  dataList = signal<ResponseData<NShopBackModel>>({
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

  data = signal<ResponseData<NShopBackModel>>({
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

  public getShopBackList(pageNumber: number, pageSize: number) {
    return this.shopBackClient.getShopBackList(pageNumber, pageSize)
      //.pipe(delay(1000))
      .subscribe({
        next: (resp: ResponseData<NShopBackModel>) => {
          this.dataList.set(resp);
        },
        error: (err) => console.log(err.error),
        complete: () => console.log('Done.'),
      });
  }

  public getShopBackById(id: string) {
    return this.shopBackClient.getShopBackById(id)
      //.pipe(delay(1000))
      .subscribe({
        next: (resp: ResponseData<NShopBackModel>) => {
          this.data.set(resp);
        },
        error: (err) => console.log(err.error),
        complete: () => console.log('Done.'),
      });
  }

  public deleteShopBackById(id: string) {
    this.shopBackClient.deleteShopBackById(id)
      .subscribe({
        error: (err) => alert("Unabled to delete record with id " + id + ":" + err.error),
        complete: () => alert(id + " has been deleted."),
      });
  }

  public createShopBack(model: NShopBackModel) {
    this.shopBackClient.createShopBack(model)
      .subscribe({
        error: (err) => alert("Unabled to save record : " + err.error),
        complete: () => alert(" ShopBack has been created."),
      });
  }

  public updateShopBack(model: NShopBackModel) {
    this.shopBackClient.updateShopBack(model)
      .subscribe({
        error: (err) => alert("Unabled to save record : " + err.error),
        complete: () => alert(" ShopBack has been updated."),
      });
  }

}