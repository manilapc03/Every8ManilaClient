
import { Injectable, inject, effect, signal } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NUsersJobProfModel } from '../../model/N-UsersJobProf/n-usersjobprof.model';
import { ResponseData } from '../../shared/response-data';

//import { PaginationParameters } from '../../shared/Pagination/pagination-parameters';

// export interface PaginatedResponse<T> {
//   data: T[];
//   total: number;
// }

@Injectable({
    providedIn: 'root',
})

export class NUsersJobProfClient {
    private http = inject(HttpClient);

    public getUsersJobProfList(pageNumber: number, pageSize: number, searchby: string | null, keyword: string | null) {
        let strURL = environment.apiUrl + `/api/N_UsersJobProf/GetAllUsersJobProf?PageNumber=${pageNumber}&PageSize=${pageSize}`;
        if ((searchby?.trim() != '') && (keyword?.trim() != '')) {
            strURL = strURL + `&SearchBy=${searchby}&SearchByText=${keyword}`;
        }
        return this.http.get<ResponseData<NUsersJobProfModel>>(strURL);
    }

    public getUsersJobProfById(id: number) {
        return this.http.get<ResponseData<NUsersJobProfModel>>(
            environment.apiUrl + `/api/N_UsersJobProf/GetByIdUsersJobProf?id=${id}`
        );
    }

    public deleteUsersJobProfById(id: number) {
        return this.http.delete(
            environment.apiUrl + `/api/N_UsersJobProf/delete?id=${id}`
        );
    }

    public createUsersJobProf(model: NUsersJobProfModel) {
        return this.http.post(
            environment.apiUrl + `/api/N_UsersJobProf/create`, model);
    }

    public updateUsersJobProf(model: NUsersJobProfModel) {
        return this.http.put(
            environment.apiUrl + `/api/N_UsersJobProf/update`, model);
    }

}
