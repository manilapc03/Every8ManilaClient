import { map, Observable, take, tap, delay } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Injectable, inject, signal, computed, WritableSignal } from '@angular/core';
import { NUserClient } from './n-user-client';
import { NUsersModel, initialNUsersData } from '../../model/N-User/n-users.model';
import { ResponseData } from '../../shared/response-data';
//import { PaginationParameters } from '../../shared/Pagination/pagination-parameters';


@Injectable({
  providedIn: 'root',
})
export class NUserServiceAPI {
    userClient = inject(NUserClient);

    dataList = signal<ResponseData<NUsersModel>>({
      data: [],
      currentPage: 0,
      hasNext : false,
      hasPrevious: false,
      message: "",
      status: "",
      pageSize: 10,
      totalCount: 0,
      totalPages: 0,
    });

    data = signal<ResponseData<NUsersModel>>({
      data: [initialNUsersData],
      currentPage: 0,
      hasNext : false,
      hasPrevious: false,
      message: "",
      status: "",
      pageSize: 1,
      totalCount: 0,
      totalPages: 0,
    });

    public getUserList(pageNumber: number, pageSize: number, searchby: string | null, keyword : string | null) 
    {
       return this.userClient.getUserList(pageNumber, pageSize, searchby, keyword)
            //.pipe(delay(1000))
            .subscribe({
                next: (resp: ResponseData<NUsersModel>) => {
                        this.dataList.set(resp);
                      },                
                error: (err) => console.log(err.error),
                complete: () => console.log('Done.'),
            }); 
    }

    public getUserById(id: number) //: Observable<ResponseData<NUsersModel>>
    {
       return this.userClient.getUserById(id)
            .pipe(delay(1000))
            .subscribe({
                next: (resp: ResponseData<NUsersModel>) => {
                        this.data.set(resp);
                      },                
                error: (err) => console.log(err.error),
                complete: () => console.log('Done.'),
            }); 
      //return this.data;
    }

    public deleteUserById(id: number) {
      this.userClient.deleteUserById(id)
            .subscribe({
                error: (err) => alert("Unabled to delete record with id "+id.toString() +":"+err.error),
                complete: () => alert(id.toString() + " has been deleted."),
            }); 
    }

    public createUser(model: NUsersModel) {
      this.userClient.createUser(model)  
            .subscribe({
                error: (err) => alert("Unabled to save record : "+err.error),
                complete: () => alert(" User has been created."),
            }); 

    }

    public updateUser(model: NUsersModel) {
      this.userClient.updateUser(model)  
            .subscribe({
                error: (err) => alert("Unabled to save record : "+err.error),
                complete: () => alert(" User has been updated."),
            }); 

    }


}
