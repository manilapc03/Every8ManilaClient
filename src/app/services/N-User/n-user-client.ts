
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

  public getUserList(pageNumber: number, pageSize: number )
  {
    return this.http.get<ResponseData<NUsersModel>>(
      environment.apiUrl+`/api/N_Users/GetAllUsers?PageNumber=${pageNumber}&PageSize=${pageSize}`
    );
  }

  public getUserById(id: number)
  {
    return this.http.get<ResponseData<NUsersModel>>(
      environment.apiUrl+`/api/N_Users/GetByIdUser?id=${id}`
    );
  }

  // GET: https://localhost:7215/api/N_Users/GetByIdUser/1
  // POST:https://localhost:7215/api/N_Users/create
  // PUT: https://localhost:7215/api/N_Users/update
  //DELETE: https://localhost:7215/api/N_Users/delete?id=1


}
