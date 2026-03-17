
import { Injectable, inject, effect, signal } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NAccessCountModel } from '../../model/N-AccessCount/n-accesscount.model';
import { ResponseData } from '../../shared/response-data';

//import { PaginationParameters } from '../../shared/Pagination/pagination-parameters';

// export interface PaginatedResponse<T> {
//   data: T[];
//   total: number;
// }


@Injectable({
    providedIn: 'root',
})

export class NAccessCountClient {
    private http = inject(HttpClient);

    public getAccessCountList(pageNumber: number, pageSize: number, ymd: string | null, chihou_id: string | null, type: string | null, page_id: string | null) {
        // FIXED: Pointed the URL to GetByIdAccessCount instead of GetAllAccessCount
        let strURL = environment.apiUrl + `/api/N_AccessCount/GetByIdAccessCount?PageNumber=${pageNumber}&PageSize=${pageSize}`;

        // Append the new filters to the URL if they have a value
        if (ymd?.trim()) strURL += `&ymd=${ymd}`;
        if (chihou_id?.trim()) strURL += `&chihou_id=${chihou_id}`;
        if (type?.trim()) strURL += `&type=${type}`;
        if (page_id?.trim()) strURL += `&page_id=${page_id}`;

        return this.http.get<ResponseData<NAccessCountModel>>(strURL);
    }

    public getAccessCountById(id: number) {
        return this.http.get<ResponseData<NAccessCountModel>>(
            environment.apiUrl + `/api/N_AccessCount/GetByIdAccessCount?id=${id}`
        );
    }

    public deleteAccessCountById(id: number) {
        return this.http.delete(
            environment.apiUrl + `/api/N_AccessCount/delete?id=${id}`
        );
    }

    public createAccessCount(model: NAccessCountModel) {
        return this.http.post(
            environment.apiUrl + `/api/N_AccessCount/create`, model);
    }

    public updateAccessCount(model: NAccessCountModel) {
        return this.http.put(
            environment.apiUrl + `/api/N_AccessCount/update`, model);
    }

}