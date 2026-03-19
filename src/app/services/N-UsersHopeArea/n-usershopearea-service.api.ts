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
    usersHopeAreaClient = inject(NUsersHopeAreaClient);

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

    public getUsersHopeAreaList(pageNumber: number, pageSize: number, uid: string | null, shop_id: string | null) {
        return this.usersHopeAreaClient.getUsersHopeAreaList(pageNumber, pageSize, uid, shop_id)
            .subscribe({
                next: (resp: ResponseData<NUsersHopeAreaModel>) => {
                    this.dataList.set(resp);
                },
                error: (err) => console.log(err.error),
                complete: () => console.log('Done.'),
            });
    }

    public getUsersHopeAreaById(id: number) {
        return this.usersHopeAreaClient.getUsersHopeAreaById(id)
            //.pipe(delay(1000))
            .subscribe({
                next: (resp: ResponseData<NUsersHopeAreaModel>) => {
                    this.data.set(resp);
                },
                error: (err) => console.log(err.error),
                complete: () => console.log('Done.'),
            });
    }

    public deleteUsersHopeAreaById(id: number) {
        this.usersHopeAreaClient.deleteUsersHopeAreaById(id)
            .subscribe({
                error: (err) => alert("Unabled to delete record with id " + id.toString() + ":" + err.error),
                complete: () => alert(id.toString() + " has been deleted."),
            });
    }

    public createUsersHopeArea(model: NUsersHopeAreaModel) {
        this.usersHopeAreaClient.createUsersHopeArea(model)
            .subscribe({
                error: (err) => alert("Unabled to save record : " + err.error),
                complete: () => alert(" UsersHopeArea has been created."),
            });

    }

    public updateUsersHopeArea(model: NUsersHopeAreaModel) {
        this.usersHopeAreaClient.updateUsersHopeArea(model)
            .subscribe({
                error: (err) => alert("Unabled to save record : " + err.error),
                complete: () => alert(" UsersHopeArea has been updated."),
            });

    }


}
