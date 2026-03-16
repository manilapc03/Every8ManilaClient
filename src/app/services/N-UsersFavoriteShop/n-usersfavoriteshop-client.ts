
import { Injectable, inject, effect, signal } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NUsersFavoriteShopModel } from '../../model/N-UsersFavoriteShop/n-usersfavoriteshop.model';
import { ResponseData } from '../../shared/response-data';

//import { PaginationParameters } from '../../shared/Pagination/pagination-parameters';

// export interface PaginatedResponse<T> {
//   data: T[];
//   total: number;
// }

@Injectable({
    providedIn: 'root',
})

export class NUsersFavoriteShopClient {
    private http = inject(HttpClient);

    public getUsersFavoriteShopList(pageNumber: number, pageSize: number) {
        return this.http.get<ResponseData<NUsersFavoriteShopModel>>(
            environment.apiUrl + `/api/N_UsersFavoriteShop/GetAllUsersFavoriteShop?PageNumber=${pageNumber}&PageSize=${pageSize}`
        );
    }

    public getUsersFavoriteShopById(id: number) {
        return this.http.get<ResponseData<NUsersFavoriteShopModel>>(
            environment.apiUrl + `/api/N_UsersFavoriteShop/GetByIdUsersFavoriteShop?id=${id}`
        );
    }

}
