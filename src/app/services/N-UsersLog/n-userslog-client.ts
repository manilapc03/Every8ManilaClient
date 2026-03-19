
import { Injectable, inject, effect, signal } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NUsersLogModel } from '../../model/N-UsersLog/n-userslog.model';
import { ResponseData } from '../../shared/response-data';

//import { PaginationParameters } from '../../shared/Pagination/pagination-parameters';

// export interface PaginatedResponse<T> {
//   data: T[];
//   total: number;
// }


@Injectable({
    providedIn: 'root',
})

export class NUsersLogClient {
    private http = inject(HttpClient);

    public getUsersLogList(pageNumber: number, pageSize: number, create_date: string | null, chihou_id: string | null) {
        // FIXED: Pointed the URL to GetByIdUsersLog instead of GetAllUsersLog
        let strURL = environment.apiUrl + `/api/N_UsersLog/GetByIdUsersLog?PageNumber=${pageNumber}&PageSize=${pageSize}`;

        // Append the new filters to the URL if they have a value
        if (create_date?.trim()) strURL += `&create_date=${create_date}`;
        if (chihou_id?.trim()) strURL += `&chihou_id=${chihou_id}`;

        return this.http.get<ResponseData<NUsersLogModel>>(strURL);
    }

    public getUsersLogById(id: number) {
        return this.http.get<ResponseData<NUsersLogModel>>(
            environment.apiUrl + `/api/N_UsersLog/GetByIdUsersLog?id=${id}`
        );
    }

    public deleteUsersLogById(id: number) {
        return this.http.delete(
            environment.apiUrl + `/api/N_UsersLog/delete?id=${id}`
        );
    }

    public createUsersLog(model: NUsersLogModel) {
        return this.http.post(
            environment.apiUrl + `/api/N_UsersLog/create`, model);
    }

    public updateUsersLog(model: NUsersLogModel) {
        return this.http.put(
            environment.apiUrl + `/api/N_UsersLog/update`, model);
    }

}