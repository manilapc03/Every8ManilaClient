import { map, Observable, take, tap, delay } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Injectable, inject, signal, computed, WritableSignal } from '@angular/core';
import { NAccessCountClient } from './n-accesscount-client';
import { NAccessCountModel } from '../../model/N-AccessCount/n-accesscount.model';
import { ResponseData } from '../../shared/response-data';
//import { PaginationParameters } from '../../shared/Pagination/pagination-parameters';


@Injectable({
    providedIn: 'root',
})
export class NAccessCountServiceAPI {
    accessCountClient = inject(NAccessCountClient);

    dataList = signal<ResponseData<NAccessCountModel>>({
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

    data = signal<ResponseData<NAccessCountModel>>({
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

    public getAccessCountList(pageNumber: number, pageSize: number, ymd: string | null, chihou_id: string | null, type: string | null, page_id: string | null) {
        return this.accessCountClient.getAccessCountList(pageNumber, pageSize, ymd, chihou_id, type, page_id)
            .subscribe({
                next: (resp: ResponseData<NAccessCountModel>) => {
                    this.dataList.set(resp);
                },
                error: (err) => console.log(err.error),
                complete: () => console.log('Done.'),
            });
    }

    public getAccessCountById(id: number) {
        return this.accessCountClient.getAccessCountById(id)
            //.pipe(delay(1000))
            .subscribe({
                next: (resp: ResponseData<NAccessCountModel>) => {
                    this.data.set(resp);
                },
                error: (err) => console.log(err.error),
                complete: () => console.log('Done.'),
            });
    }

    public deleteAccessCountById(id: number) {
        this.accessCountClient.deleteAccessCountById(id)
            .subscribe({
                error: (err) => alert("Unabled to delete record with id " + id.toString() + ":" + err.error),
                complete: () => alert(id.toString() + " has been deleted."),
            });
    }

    public createAccessCount(model: NAccessCountModel) {
        this.accessCountClient.createAccessCount(model)
            .subscribe({
                error: (err) => alert("Unabled to save record : " + err.error),
                complete: () => alert(" AccessCount has been created."),
            });

    }

    public updateAccessCount(model: NAccessCountModel) {
        this.accessCountClient.updateAccessCount(model)
            .subscribe({
                error: (err) => alert("Unabled to save record : " + err.error),
                complete: () => alert(" AccessCount has been updated."),
            });

    }


}
