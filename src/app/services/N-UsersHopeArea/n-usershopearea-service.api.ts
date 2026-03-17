import { map, Observable, take, tap, delay } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Injectable, inject, signal, computed, WritableSignal } from '@angular/core';
import { NUsersHopeAreaClient } from './n-usershopearea-client';
import { NUsersHopeAreaModel } from '../../model/N-UsersHopeArea/n-usershopearea.model';
import { ResponseData } from '../../shared/response-data';
//import { PaginationParameters } from '../../shared/Pagination/pagination-parameters';


@Injectable({
    providedIn: 'root',
})
export class NUsersHopeAreaServiceAPI {
    userHopeAreaClient = inject(NUsersHopeAreaClient);

    dataList = signal<ResponseData<NUsersHopeAreaModel>>({
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

    data = signal<ResponseData<NUsersHopeAreaModel>>({
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

    public getUsersHopeAreaList(pageNumber: number, pageSize: number) {
        return this.userHopeAreaClient.getUsersHopeAreaList(pageNumber, pageSize)
            //.pipe(delay(1000))
            .subscribe({
                next: (resp: ResponseData<NUsersHopeAreaModel>) => {
                    this.dataList.set(resp);
                },
                error: (err) => console.log(err.error),
                complete: () => console.log('Done.'),
            });
    }

    public getUsersHopeAreaById(id: number) {
        return this.userHopeAreaClient.getUsersHopeAreaById(id)
            //.pipe(delay(1000))
            .subscribe({
                next: (resp: ResponseData<NUsersHopeAreaModel>) => {
                    this.data.set(resp);
                },
                error: (err) => console.log(err.error),
                complete: () => console.log('Done.'),
            });
    }

}
