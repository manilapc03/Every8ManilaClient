
import { Injectable, inject, effect, signal } from '@angular/core';
import { HttpClient, httpResource, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NUsersLoginHistoryModel } from '../../model/N-UsersLoginHistory/n-usersloginhistory.model';
import { ResponseData } from '../../shared/response-data';

@Injectable({
    providedIn: 'root',
})

export class NUsersLoginHistoryClient {
    private http = inject(HttpClient);

    public getUsersLoginHistoryList(pageNumber: number, pageSize: number, searchby: string | null, keyword: string | null) {
        // let strURL = environment.apiUrl+`/api/N_UsersLoginHistorys/GetAllUsersLoginHistorys?PageNumber=${pageNumber}&PageSize=${pageSize}`;      
        // if ((searchby?.trim() != '') && (keyword?.trim() != '')) {
        //   strURL = strURL + `&SearchBy=${searchby}&SearchByText=${keyword}`;
        // }
        // return this.http.get<ResponseData<NUsersLoginHistorysModel>>(strURL);

        let strURL = environment.apiUrl + `/api/N_UsersLoginHistory/GetAllUsersLoginHistory`;
        let params = new HttpParams()
            .set('PageNumber', pageNumber)
            .set('PageSize', pageSize);

        if ((searchby?.trim() != '') && (keyword?.trim() != '')) {
            params = params.append('SearchBy', `${searchby}`);
            params = params.append('SearchByText', `${keyword}`);
        }
        return this.http.get<ResponseData<NUsersLoginHistoryModel>>(strURL, { params });
    }

    public getUsersLoginHistoryById(id: number) {
        return this.http.get<ResponseData<NUsersLoginHistoryModel>>(
            environment.apiUrl + `/api/N_UsersLoginHistory/GetByIdUsersLoginHistory?id=${id}`
        );
    }

    public deleteUsersLoginHistoryById(id: number) {
        return this.http.delete(
            environment.apiUrl + `/api/N_UsersLoginHistory/delete?id=${id}`
        );
    }

    public createUsersLoginHistory(model: NUsersLoginHistoryModel) {
        return this.http.post(
            environment.apiUrl + `/api/N_UsersLoginHistory/create`, model);
    }

    public updateUsersLoginHistory(model: NUsersLoginHistoryModel) {
        return this.http.put(
            environment.apiUrl + `/api/N_UsersLoginHistory/update`, model);
    }


    // GET: https://localhost:7215/api/N_UsersLoginHistory/GetByIdUsersLoginHistory/1
    //DELETE: https://localhost:7215/api/N_UsersLoginHistory/delete?id=1
    // POST:https://localhost:7215/api/N_UsersLoginHistory/create
    // PUT: https://localhost:7215/api/N_UsersLoginHistory/update


}
