import { map, Observable, take, tap, delay } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Injectable, inject, signal } from '@angular/core';
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

  public shopList(pageNumber: number, pageSize: number)
  {
     return this.shopClient.getShopList(pageNumber, pageSize)
          .pipe(delay(1000))
          .subscribe({
              next: (resp: ResponseData<NShopModel>) => {
                      this.dataList.set(resp);
                    },                
              error: (err) => console.log(err.error),
              complete: () => console.log('Done.'),
          }); 
  }

}