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
    usersFavoriteShopClient = inject(NUsersFavoriteShopClient);

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

    public getUsersFavoriteShopList(pageNumber: number, pageSize: number, uid: string | null, shop_id: string | null) {
        return this.usersFavoriteShopClient.getUsersFavoriteShopList(pageNumber, pageSize, uid, shop_id)
            .subscribe({
                next: (resp: ResponseData<NUsersFavoriteShopModel>) => {
                    this.dataList.set(resp);
                },
                error: (err) => console.log(err.error),
                complete: () => console.log('Done.'),
            });
    }

    public getUsersFavoriteShopById(id: number) {
        return this.usersFavoriteShopClient.getUsersFavoriteShopById(id)
            //.pipe(delay(1000))
            .subscribe({
                next: (resp: ResponseData<NUsersFavoriteShopModel>) => {
                    this.data.set(resp);
                },
                error: (err) => console.log(err.error),
                complete: () => console.log('Done.'),
            });
    }

    public deleteUsersFavoriteShopById(id: number) {
        this.usersFavoriteShopClient.deleteUsersFavoriteShopById(id)
            .subscribe({
                error: (err) => alert("Unabled to delete record with id " + id.toString() + ":" + err.error),
                complete: () => alert(id.toString() + " has been deleted."),
            });
    }

    public createUsersFavoriteShop(model: NUsersFavoriteShopModel) {
        this.usersFavoriteShopClient.createUsersFavoriteShop(model)
            .subscribe({
                error: (err) => alert("Unabled to save record : " + err.error),
                complete: () => alert(" UsersFavoriteShop has been created."),
            });

    }

    public updateUsersFavoriteShop(model: NUsersFavoriteShopModel) {
        this.usersFavoriteShopClient.updateUsersFavoriteShop(model)
            .subscribe({
                error: (err) => alert("Unabled to save record : " + err.error),
                complete: () => alert(" UsersFavoriteShop has been updated."),
            });

    }


}
