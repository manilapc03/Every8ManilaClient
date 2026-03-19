
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

    public getUsersFavoriteShopList(pageNumber: number, pageSize: number, uid: string | null, shop_id: string | null) {
        // FIXED: Pointed the URL to GetByIdUsersFavoriteShop instead of GetAllUsersFavoriteShop
        let strURL = environment.apiUrl + `/api/N_UsersFavoriteShop/GetByIdUsersFavoriteShop?PageNumber=${pageNumber}&PageSize=${pageSize}`;

        // Append the new filters to the URL if they have a value
        if (uid?.trim()) strURL += `&uid=${uid}`;
        if (shop_id?.trim()) strURL += `&shop_id=${shop_id}`;

        return this.http.get<ResponseData<NUsersFavoriteShopModel>>(strURL);
    }

    public getUsersFavoriteShopById(id: number) {
        return this.http.get<ResponseData<NUsersFavoriteShopModel>>(
            environment.apiUrl + `/api/N_UsersFavoriteShop/GetByIdUsersFavoriteShop?id=${id}`
        );
    }

    public deleteUsersFavoriteShopById(id: number) {
        return this.http.delete(
            environment.apiUrl + `/api/N_UsersFavoriteShop/delete?id=${id}`
        );
    }

    public createUsersFavoriteShop(model: NUsersFavoriteShopModel) {
        return this.http.post(
            environment.apiUrl + `/api/N_UsersFavoriteShop/create`, model);
    }

    public updateUsersFavoriteShop(model: NUsersFavoriteShopModel) {
        return this.http.put(
            environment.apiUrl + `/api/N_UsersFavoriteShop/update`, model);
    }

}