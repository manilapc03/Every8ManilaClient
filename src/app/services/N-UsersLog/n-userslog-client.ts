
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

    public getUsersLogList(pageNumber: number, pageSize: number) {
        return this.http.get<ResponseData<NUsersLogModel>>(
            environment.apiUrl + `/api/N_UsersLog/GetAllUsersLog?PageNumber=${pageNumber}&PageSize=${pageSize}`
        );
    }

    public getUsersLogById(id: number) {
        return this.http.get<ResponseData<NUsersLogModel>>(
            environment.apiUrl + `/api/N_UsersLog/GetByIdUsersLog?id=${id}`
        );
    }

}
