
import { Injectable, inject, effect, signal } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NUsersBlockShopModel } from '../../model/N-UsersBlockShop/n-usersblockshop.model';
import { ResponseData } from '../../shared/response-data';

//import { PaginationParameters } from '../../shared/Pagination/pagination-parameters';

// export interface PaginatedResponse<T> {
//   data: T[];
//   total: number;
// }

@Injectable({
    providedIn: 'root',
})

export class NUsersBlockShopClient {
    private http = inject(HttpClient);

    public getUsersBlockShopList(pageNumber: number, pageSize: number, searchby: string | null, keyword: string | null) {
        let strURL = environment.apiUrl + `/api/N_UsersBlockShop/GetAllUsersBlockShop?PageNumber=${pageNumber}&PageSize=${pageSize}`;
        if ((searchby?.trim() != '') && (keyword?.trim() != '')) {
            strURL = strURL + `&SearchBy=${searchby}&SearchByText=${keyword}`;
        }
        return this.http.get<ResponseData<NUsersBlockShopModel>>(strURL);
    }

    public getUsersBlockShopById(id: number) {
        return this.http.get<ResponseData<NUsersBlockShopModel>>(
            environment.apiUrl + `/api/N_UsersBlockShop/GetByIdUsersBlockShop?id=${id}`
        );
    }

    public deleteUsersBlockShopById(id: number) {
        return this.http.delete(
            environment.apiUrl + `/api/N_UsersBlockShop/delete?id=${id}`
        );
    }

    public createUsersBlockShop(model: NUsersBlockShopModel) {
        return this.http.post(
            environment.apiUrl + `/api/N_UsersBlockShop/create`, model);
    }

    public updateUsersBlockShop(model: NUsersBlockShopModel) {
        return this.http.put(
            environment.apiUrl + `/api/N_UsersBlockShop/update`, model);
    }

}
