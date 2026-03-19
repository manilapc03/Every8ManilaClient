import { map, Observable, take, tap, delay } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Injectable, inject, signal, computed, WritableSignal } from '@angular/core';
import { NUsersLoginHistoryClient } from './n-usersloginhistory-client';
import { NUsersLoginHistoryModel } from '../../model/N-UsersLoginHistory/n-usersloginhistory.model';
import { ResponseData } from '../../shared/response-data';
//import { PaginationParameters } from '../../shared/Pagination/pagination-parameters';


@Injectable({
    providedIn: 'root',
})
export class NUsersLoginHistoryServiceAPI {
    userClient = inject(NUsersLoginHistoryClient);

    dataList = signal<ResponseData<NUsersLoginHistoryModel>>({
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

    data = signal<ResponseData<NUsersLoginHistoryModel>>({
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

    public getUserHistoryList(pageNumber: number, pageSize: number, searchby: string | null, keyword: string | null) {
        return this.userClient.getUsersLoginHistoryList(pageNumber, pageSize, searchby, keyword)
            //.pipe(delay(1000))
            .subscribe({
                next: (resp: ResponseData<NUsersLoginHistoryModel>) => {
                    this.dataList.set(resp);
                },
                error: (err) => console.log(err.error),
                complete: () => console.log('Done.'),
            });
    }

    public getUsersLoginHistoryById(id: number) {
        return this.userClient.getUsersLoginHistoryById(id)
            //.pipe(delay(1000))
            .subscribe({
                next: (resp: ResponseData<NUsersLoginHistoryModel>) => {
                    this.data.set(resp);
                },
                error: (err) => console.log(err.error),
                complete: () => console.log('Done.'),
            });
    }

    public deleteUsersLoginHistoryById(id: number) {
        this.userClient.deleteUsersLoginHistoryById(id)
            .subscribe({
                error: (err) => alert("Unabled to delete record with id " + id.toString() + ":" + err.error),
                complete: () => alert(id.toString() + " has been deleted."),
            });
    }

    public createUsersLoginHistory(model: NUsersLoginHistoryModel) {
        this.userClient.createUsersLoginHistory(model)
            .subscribe({
                error: (err) => alert("Unabled to save record : " + err.error),
                complete: () => alert(" User has been created."),
            });

    }

    public updateUsersLoginHistory(model: NUsersLoginHistoryModel) {
        this.userClient.updateUsersLoginHistory(model)
            .subscribe({
                error: (err) => alert("Unabled to save record : " + err.error),
                complete: () => alert(" User has been updated."),
            });

    }


}
