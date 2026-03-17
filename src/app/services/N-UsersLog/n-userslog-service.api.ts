import { map, Observable, take, tap, delay } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Injectable, inject, signal, computed, WritableSignal } from '@angular/core';
import { NUsersLogClient } from './n-userslog-client';
import { NUsersLogModel } from '../../model/N-UsersLog/n-userslog.model';
import { ResponseData } from '../../shared/response-data';
//import { PaginationParameters } from '../../shared/Pagination/pagination-parameters';


@Injectable({
    providedIn: 'root',
})
export class NUsersLogServiceAPI {
    userLogClient = inject(NUsersLogClient);

    dataList = signal<ResponseData<NUsersLogModel>>({
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

    data = signal<ResponseData<NUsersLogModel>>({
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

    public getUsersLogList(pageNumber: number, pageSize: number) {
        return this.userLogClient.getUsersLogList(pageNumber, pageSize)
            //.pipe(delay(1000))
            .subscribe({
                next: (resp: ResponseData<NUsersLogModel>) => {
                    this.dataList.set(resp);
                },
                error: (err) => console.log(err.error),
                complete: () => console.log('Done.'),
            });
    }

    public getUsersLogById(id: number) {
        return this.userLogClient.getUsersLogById(id)
            //.pipe(delay(1000))
            .subscribe({
                next: (resp: ResponseData<NUsersLogModel>) => {
                    this.data.set(resp);
                },
                error: (err) => console.log(err.error),
                complete: () => console.log('Done.'),
            });
    }

}
