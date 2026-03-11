
import { Injectable, inject, effect, signal } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NAccessCountModel } from '../../model/N-AccessCount/n-accesscount.model';
import { ResponseData } from '../../shared/response-data';

//import { PaginationParameters } from '../../shared/Pagination/pagination-parameters';

// export interface PaginatedResponse<T> {
//   data: T[];
//   total: number;
// }

@Injectable({
    providedIn: 'root',
})

export class NAccessCountClient {
    private http = inject(HttpClient);

    // NAccessCountsModel
    //n_userlist = signal<any[]>([]);

    /// https://localhost:7215/api/N_Users/GetAllUsers

    ///   https://localhost:7215/api/N_Users/GetAllUsers?PageNumber=2&PageSize=10

    // : Observable<any[]> 
    //    environment.apiUrl + '/api/N_Users/GetAllUsers?PageNumber=${pageNumber}&PageSize=${pageSize}',

    public getAccessCountList(pageNumber: number, pageSize: number) {
        //  '${environment.apiUrl}/api/N_Users/GetAllUsers?PageNumber=${pageNumber}&PageSize=${pageSize}'

        return this.http.get<ResponseData<NAccessCountModel>>(
            environment.apiUrl + `/api/N_AccessCount/GetAllAccessCount?PageNumber=${pageNumber}&PageSize=${pageSize}`
        );
    }



}
