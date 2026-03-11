import { map, Observable, take, tap, delay } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Injectable, inject, signal, computed, WritableSignal } from '@angular/core';
import { NUserClient } from './n-user-client';
import { NUsersModel } from '../../model/N-User/n-users.model';
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

    public userList(pageNumber: number, pageSize: number) 
    {
       return this.userClient.getUserList(pageNumber, pageSize)
            .pipe(delay(1000))
            .subscribe({
                next: (resp: ResponseData<NUsersModel>) => {
                        this.dataList.set(resp);
                      },                
                error: (err) => console.log(err.error),
                complete: () => console.log('Done.'),
            }); 
    }


  // private handleSuccessUserList(resp: ResponseData<NUsersModel>) //: Observable<ResponseData<NUsersModel>>
  // {  
  //   this._dataList.set(resp);
  // }    

    /*
    console.log(respData);

    let _currentPage = respData.currentPage;
    let _totalPages = respData.totalPages;
    let _pageSize = respData.pageSize;
    let _totalCount = respData.totalCount;
    let _status = respData.status;
    let _message = respData.message;
    let _hasPrevious = respData.hasPrevious;
    let _hasNext = respData.hasNext;

    console.log("_currentPage="+_currentPage);
    console.log("_totalPages="+_totalPages);
    console.log("_pageSize="+_pageSize);
    console.log("_totalCount="+_totalCount);
    console.log("_status="+_status);
    console.log("_message="+_message);
    console.log("_hasPrevious="+_hasPrevious);
    console.log("_hasNext="+_hasNext);

    let data = respData.data;
    for (let index = 0; index < data.length; index++) {
        const element = data[index];    
        let userdata = element;
        console.log(userdata);   
        
        //userdata.uid;
    }
    */
  


}
