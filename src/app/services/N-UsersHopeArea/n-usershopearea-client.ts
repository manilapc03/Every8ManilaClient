
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

    public getUsersHopeAreaList(pageNumber: number, pageSize: number, uid: string | null, area_id: string | null) {
        // FIXED: Pointed the URL to GetByIdUsersHopeArea instead of GetAllUsersHopeArea
        let strURL = environment.apiUrl + `/api/N_UsersHopeArea/GetByIdUsersHopeArea?PageNumber=${pageNumber}&PageSize=${pageSize}`;

        // Append the new filters to the URL if they have a value
        if (uid?.trim()) strURL += `&uid=${uid}`;
        if (area_id?.trim()) strURL += `&area_id=${area_id}`;

        return this.http.get<ResponseData<NUsersHopeAreaModel>>(strURL);
    }

    public getUsersHopeAreaById(id: number) {
        return this.http.get<ResponseData<NUsersHopeAreaModel>>(
            environment.apiUrl + `/api/N_UsersHopeArea/GetByIdUsersHopeArea?id=${id}`
        );
    }

    public deleteUsersHopeAreaById(id: number) {
        return this.http.delete(
            environment.apiUrl + `/api/N_UsersHopeArea/delete?id=${id}`
        );
    }

    public createUsersHopeArea(model: NUsersHopeAreaModel) {
        return this.http.post(
            environment.apiUrl + `/api/N_UsersHopeArea/create`, model);
    }

    public updateUsersHopeArea(model: NUsersHopeAreaModel) {
        return this.http.put(
            environment.apiUrl + `/api/N_UsersHopeArea/update`, model);
    }

}