
import { Injectable, inject, effect, signal } from '@angular/core';
import { HttpClient, httpResource, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NUsersModel } from '../../model/N-User/n-users.model';
import { ResponseData } from '../../shared/response-data';

@Injectable({
  providedIn: 'root',
})

export class NUserClient {
  private http = inject(HttpClient);

  public getUserList(pageNumber: number, pageSize: number, searchby: string | null, keyword : string | null)
  { 
    // let strURL = environment.apiUrl+`/api/N_Users/GetAllUsers?PageNumber=${pageNumber}&PageSize=${pageSize}`;      
    // if ((searchby?.trim() != '') && (keyword?.trim() != '')) {
    //   strURL = strURL + `&SearchBy=${searchby}&SearchByText=${keyword}`;
    // }
    // return this.http.get<ResponseData<NUsersModel>>(strURL);

    let strURL = environment.apiUrl+`/api/N_Users/GetAllUsers`;    
    let params = new HttpParams()
      .set('PageNumber', pageNumber)
      .set('PageSize', pageSize);      

    if ((searchby?.trim() != '') && (keyword?.trim() != '')) {       
        params = params.append('SearchBy', `${searchby}`); 
        params = params.append('SearchByText', `${keyword}`); 
    }
    return this.http.get<ResponseData<NUsersModel>>(strURL, {params});
  }

  public getUserById(id: number)
  {
    return this.http.get<ResponseData<NUsersModel>>(
      environment.apiUrl+`/api/N_Users/GetByIdUser?id=${id}`
    );
  }

  public deleteUserById(id: number)
  {
    return this.http.delete(
      environment.apiUrl+`/api/N_Users/delete?id=${id}`
    );
  }

  public createUser(model: NUsersModel)
  {
    return this.http.post(
      environment.apiUrl+`/api/N_Users/create`, model);
  }

  public updateUser(model: NUsersModel)
  {
    return this.http.put(
      environment.apiUrl+`/api/N_Users/update`, model);
  }


  // GET: https://localhost:7215/api/N_Users/GetByIdUser/1
  //DELETE: https://localhost:7215/api/N_Users/delete?id=1
  // POST:https://localhost:7215/api/N_Users/create
  // PUT: https://localhost:7215/api/N_Users/update


}
