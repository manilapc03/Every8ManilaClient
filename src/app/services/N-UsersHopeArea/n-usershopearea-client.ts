
import { Injectable, inject, effect, signal } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NUsersHopeAreaModel } from '../../model/N-UsersHopeArea/n-usershopearea.model';
import { ResponseData } from '../../shared/response-data';

@Injectable({
    providedIn: 'root',
})

export class NUsersHopeAreaClient {
    private http = inject(HttpClient);

    public getUsersHopeAreaList(pageNumber: number, pageSize: number) {
        return this.http.get<ResponseData<NUsersHopeAreaModel>>(
            environment.apiUrl + `/api/N_UsersHopeArea/GetAllUsersHopeArea?PageNumber=${pageNumber}&PageSize=${pageSize}`
        );
    }

    public getUsersHopeAreaById(id: number) {
        return this.http.get<ResponseData<NUsersHopeAreaModel>>(
            environment.apiUrl + `/api/N_UsersHopeArea/GetByIdUsersHopeArea?id=${id}`
        );
    }

}
