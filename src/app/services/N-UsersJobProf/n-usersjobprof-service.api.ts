import { map, Observable, take, tap, delay } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Injectable, inject, signal, computed, WritableSignal } from '@angular/core';
import { NUsersJobProfClient } from './n-usersjobprof-client';
import { NUsersJobProfModel } from '../../model/N-UsersJobProf/n-usersjobprof.model';
import { ResponseData } from '../../shared/response-data';
//import { PaginationParameters } from '../../shared/Pagination/pagination-parameters';


@Injectable({
    providedIn: 'root',
})
export class NUsersJobProfServiceAPI {
    userJobProfClient = inject(NUsersJobProfClient);

    dataList = signal<ResponseData<NUsersJobProfModel>>({
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

    data = signal<ResponseData<NUsersJobProfModel>>({
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

    public getUsersJobProfList(pageNumber: number, pageSize: number) {
        return this.userJobProfClient.getUsersJobProfList(pageNumber, pageSize)
            //.pipe(delay(1000))
            .subscribe({
                next: (resp: ResponseData<NUsersJobProfModel>) => {
                    this.dataList.set(resp);
                },
                error: (err) => console.log(err.error),
                complete: () => console.log('Done.'),
            });
    }

    public getUsersJobProfById(id: number) {
        return this.userJobProfClient.getUsersJobProfById(id)
            //.pipe(delay(1000))
            .subscribe({
                next: (resp: ResponseData<NUsersJobProfModel>) => {
                    this.data.set(resp);
                },
                error: (err) => console.log(err.error),
                complete: () => console.log('Done.'),
            });
    }

}
