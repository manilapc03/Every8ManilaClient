
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

    public getUsersBlockShopList(pageNumber: number, pageSize: number) {
        return this.http.get<ResponseData<NUsersBlockShopModel>>(
            environment.apiUrl + `/api/N_UsersBlockShop/GetAllUsersBlockShop?PageNumber=${pageNumber}&PageSize=${pageSize}`
        );
    }

    public getUsersBlockShopById(id: number) {
        return this.http.get<ResponseData<NUsersBlockShopModel>>(
            environment.apiUrl + `/api/N_UsersBlockShop/GetByIdUsersBlockShop?id=${id}`
        );
    }

}
