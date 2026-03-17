import { map, Observable, take, tap, delay } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Injectable, inject, signal, computed, WritableSignal } from '@angular/core';
import { NShopBackUpFlgClient } from './n-shopbackupflg-client';
import { NShopBackUpFlgModel } from '../../model/N-ShopBackUpFlg/n-shopbackupflg';
import { ResponseData } from '../../shared/response-data';

@Injectable({
  providedIn: 'root',
})
export class NShopBackUpFlgServiceAPI {

  shopBackUpFlgClient = inject(NShopBackUpFlgClient);

  dataList = signal<ResponseData<NShopBackUpFlgModel>>({
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

  data = signal<ResponseData<NShopBackUpFlgModel>>({
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

  public getShopBackUpFlgList(pageNumber: number, pageSize: number) {
    return this.shopBackUpFlgClient.getShopBackUpFlgList(pageNumber, pageSize)
      //.pipe(delay(1000))
      .subscribe({
        next: (resp: ResponseData<NShopBackUpFlgModel>) => {
          this.dataList.set(resp);
        },
        error: (err) => console.log(err.error),
        complete: () => console.log('Done.'),
      });
  }

  public getShopBackUpFlgById(id: string) {
    return this.shopBackUpFlgClient.getShopBackUpFlgById(id)
      //.pipe(delay(1000))
      .subscribe({
        next: (resp: ResponseData<NShopBackUpFlgModel>) => {
          this.data.set(resp);
        },
        error: (err) => console.log(err.error),
        complete: () => console.log('Done.'),
      });
  }

  public deleteShopBackUpFlgById(id: string) {
    this.shopBackUpFlgClient.deleteShopBackUpFlgById(id)
      .subscribe({
        error: (err) => alert("Unabled to delete record with id " + id + ":" + err.error),
        complete: () => alert(id + " has been deleted."),
      });
  }

  public createShopBackUpFlg(model: NShopBackUpFlgModel) {
    this.shopBackUpFlgClient.createShopBackUpFlg(model)
      .subscribe({
        error: (err) => alert("Unabled to save record : " + err.error),
        complete: () => alert(" ShopBackUpFlg has been created."),
      });
  }

  public updateShopBackUpFlg(model: NShopBackUpFlgModel) {
    this.shopBackUpFlgClient.updateShopBackUpFlg(model)
      .subscribe({
        error: (err) => alert("Unabled to save record : " + err.error),
        complete: () => alert(" ShopBackUpFlg has been updated."),
      });
  }

}