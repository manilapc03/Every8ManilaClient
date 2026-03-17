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
    usersJobProfClient = inject(NUsersJobProfClient);

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

    public getUsersJobProfList(pageNumber: number, pageSize: number, searchby: string | null, keyword: string | null) {
        return this.usersJobProfClient.getUsersJobProfList(pageNumber, pageSize, searchby, keyword)
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
        return this.usersJobProfClient.getUsersJobProfById(id)
            //.pipe(delay(1000))
            .subscribe({
                next: (resp: ResponseData<NUsersJobProfModel>) => {
                    this.data.set(resp);
                },
                error: (err) => console.log(err.error),
                complete: () => console.log('Done.'),
            });
    }

    public deleteUsersJobProfById(id: number) {
        this.usersJobProfClient.deleteUsersJobProfById(id)
            .subscribe({
                error: (err) => alert("Unabled to delete record with id " + id.toString() + ":" + err.error),
                complete: () => alert(id.toString() + " has been deleted."),
            });
    }

    public createUsersJobProf(model: NUsersJobProfModel) {
        this.usersJobProfClient.createUsersJobProf(model)
            .subscribe({
                error: (err) => alert("Unabled to save record : " + err.error),
                complete: () => alert(" UsersJobProf has been created."),
            });

    }

    public updateUsersJobProf(model: NUsersJobProfModel) {
        this.usersJobProfClient.updateUsersJobProf(model)
            .subscribe({
                error: (err) => alert("Unabled to save record : " + err.error),
                complete: () => alert(" UsersJobProf has been updated."),
            });

    }


}
