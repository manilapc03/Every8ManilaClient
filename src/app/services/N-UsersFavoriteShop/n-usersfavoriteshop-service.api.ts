import { map, Observable, take, tap, delay } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Injectable, inject, signal, computed, WritableSignal } from '@angular/core';
import { NUsersFavoriteShopClient } from './n-usersfavoriteshop-client';
import { NUsersFavoriteShopModel } from '../../model/N-UsersFavoriteShop/n-usersfavoriteshop.model';
import { ResponseData } from '../../shared/response-data';
//import { PaginationParameters } from '../../shared/Pagination/pagination-parameters';


@Injectable({
    providedIn: 'root',
})
export class NUsersFavoriteShopServiceAPI {
    userFavoriteShopClient = inject(NUsersFavoriteShopClient);

    dataList = signal<ResponseData<NUsersFavoriteShopModel>>({
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

    data = signal<ResponseData<NUsersFavoriteShopModel>>({
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

    public getUsersFavoriteShopList(pageNumber: number, pageSize: number) {
        return this.userFavoriteShopClient.getUsersFavoriteShopList(pageNumber, pageSize)
            //.pipe(delay(1000))
            .subscribe({
                next: (resp: ResponseData<NUsersFavoriteShopModel>) => {
                    this.dataList.set(resp);
                },
                error: (err) => console.log(err.error),
                complete: () => console.log('Done.'),
            });
    }

    public getUsersFavoriteShopById(id: number) {
        return this.userFavoriteShopClient.getUsersFavoriteShopById(id)
            //.pipe(delay(1000))
            .subscribe({
                next: (resp: ResponseData<NUsersFavoriteShopModel>) => {
                    this.data.set(resp);
                },
                error: (err) => console.log(err.error),
                complete: () => console.log('Done.'),
            });
    }


}
