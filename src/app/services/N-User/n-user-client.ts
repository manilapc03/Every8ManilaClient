
import { Injectable, inject, effect, signal } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NUsersModel } from '../../model/N-User/n-users.model';
import { ResponseData } from '../../shared/response-data';

//import { PaginationParameters } from '../../shared/Pagination/pagination-parameters';

// export interface PaginatedResponse<T> {
//   data: T[];
//   total: number;
// }

@Injectable({
  providedIn: 'root',
})

export class NUserClient {
  private http = inject(HttpClient);

  // NUsersModel
  //n_userlist = signal<any[]>([]);

  /// https://localhost:7215/api/N_Users/GetAllUsers

  ///   https://localhost:7215/api/N_Users/GetAllUsers?PageNumber=2&PageSize=10

  // : Observable<any[]> 
  //    environment.apiUrl + '/api/N_Users/GetAllUsers?PageNumber=${pageNumber}&PageSize=${pageSize}',

  public getUserList(pageNumber: number, pageSize: number )
  {
    //  '${environment.apiUrl}/api/N_Users/GetAllUsers?PageNumber=${pageNumber}&PageSize=${pageSize}'

    return this.http.get<ResponseData<NUsersModel>>(
      environment.apiUrl+`/api/N_Users/GetAllUsers?PageNumber=${pageNumber}&PageSize=${pageSize}`
    );
  }



}
