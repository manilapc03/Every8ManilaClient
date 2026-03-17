import { map, Observable, take, tap, delay } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Injectable, inject, signal, computed, WritableSignal } from '@angular/core';
import { NUsersBlockShopClient } from './n-usersblockshop-client';
import { NUsersBlockShopModel } from '../../model/N-UsersBlockShop/n-usersblockshop.model';
import { ResponseData } from '../../shared/response-data';
//import { PaginationParameters } from '../../shared/Pagination/pagination-parameters';


@Injectable({
    providedIn: 'root',
})
export class NUsersBlockShopServiceAPI {
    usersBlockShopClient = inject(NUsersBlockShopClient);

    dataList = signal<ResponseData<NUsersBlockShopModel>>({
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

    data = signal<ResponseData<NUsersBlockShopModel>>({
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

    public getUsersBlockShopList(pageNumber: number, pageSize: number, searchby: string | null, keyword: string | null) {
        return this.usersBlockShopClient.getUsersBlockShopList(pageNumber, pageSize, searchby, keyword)
            //.pipe(delay(1000))
            .subscribe({
                next: (resp: ResponseData<NUsersBlockShopModel>) => {
                    this.dataList.set(resp);
                },
                error: (err) => console.log(err.error),
                complete: () => console.log('Done.'),
            });
    }

    public getUsersBlockShopById(id: number) {
        return this.usersBlockShopClient.getUsersBlockShopById(id)
            //.pipe(delay(1000))
            .subscribe({
                next: (resp: ResponseData<NUsersBlockShopModel>) => {
                    this.data.set(resp);
                },
                error: (err) => console.log(err.error),
                complete: () => console.log('Done.'),
            });
    }

    public deleteUsersBlockShopById(id: number) {
        this.usersBlockShopClient.deleteUsersBlockShopById(id)
            .subscribe({
                error: (err) => alert("Unabled to delete record with id " + id.toString() + ":" + err.error),
                complete: () => alert(id.toString() + " has been deleted."),
            });
    }

    public createUsersBlockShop(model: NUsersBlockShopModel) {
        this.usersBlockShopClient.createUsersBlockShop(model)
            .subscribe({
                error: (err) => alert("Unabled to save record : " + err.error),
                complete: () => alert(" UsersBlockShop has been created."),
            });

    }

    public updateUsersBlockShop(model: NUsersBlockShopModel) {
        this.usersBlockShopClient.updateUsersBlockShop(model)
            .subscribe({
                error: (err) => alert("Unabled to save record : " + err.error),
                complete: () => alert(" UsersBlockShop has been updated."),
            });

    }


}
