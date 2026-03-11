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

    public accessCountList(pageNumber: number, pageSize: number) {
        return this.accessCountClient.getAccessCountList(pageNumber, pageSize)
            .pipe(delay(1000))
            .subscribe({
                next: (resp: ResponseData<NAccessCountModel>) => {
                    this.dataList.set(resp);
                },
                error: (err) => console.log(err.error),
                complete: () => console.log('Done.'),
            });
    }

}
