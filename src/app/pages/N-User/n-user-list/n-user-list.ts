import { Component, inject, signal, computed, input, model, effect, OnInit } from '@angular/core';
import { NUserServiceAPI } from '../../../services/N-User/n-user-service-api';
import { ResponseData } from '../../../shared/response-data';
import { NUsersModel } from '../../../model/N-User/n-users.model';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-n-user-list',
  imports: [],
  templateUrl: './n-user-list.html',
  styleUrl: './n-user-list.css',
})
export class NUserList implements OnInit {

  userService = inject(NUserServiceAPI);

  selectedPagesize = model<string | null>("10");
  pageInput = model<number>(1);

  pageSize = signal<number>(10);;
  currentPage = signal<number>(1);

  pageData = computed(() => {
    console.log(this.userService.dataList().data);
    return this.userService.dataList().data
  });

 onChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedPagesize.set(value);

    this.pageSize.set(parseInt(value, 10));

    this.currentPage.set(1);
    this.updatePage();
  }

  updateInputPage(value: number) {
    this.pageInput.set(Number(value));
  }

  
  getPage() {    
    this.gotoPage(this.pageInput());
  }

  gotoPage(page: number): void {
    if (page < 1 || page > this.userService.dataList().totalPages) {
      return;
    }
    this.currentPage.set(page);
    this.updatePage();
  }

  updatePage() { 
    try {
      this.userService.userList(this.currentPage(),this.pageSize()).unsubscribe();
      this.userService.userList(this.currentPage(),this.pageSize());

      //this.totalPage.set(this.userService.dataList().totalPages);
    } catch (error) {
      // Code to handle the error
    } finally {
      //
       //alert("updatePage()");
    }

  }

  ngOnInit() {
    this.currentPage.set(1);
    this.userService.userList(this.currentPage(),this.pageSize());
    this.updatePage();
  }

  nextPage(){
    if(this.currentPage() < this.userService.dataList().totalPages){
       this.currentPage.update(currentValue => currentValue + 1);

       this.updatePage();
    }
  }

  prevPage(){
     if(this.currentPage() > 1){
       this.currentPage.update(currentValue => currentValue - 1);
      this.updatePage();
     }
  }


  addHandler(){

  }

  editHandler(id: string) {
    alert("editHandler:"+id);
    //this.router.navigate(['/editemployee', id]);
  }

  deleteHandler(id: string) {
    alert("deleteHandler:"+id);

    // if(confirm('Are you sure to delete this employee?')) {
    //   this.userService.deleteEmployee(id).subscribe(() => {
    //     // Refresh the list after deletion
    //     this.api.GetallEmployee().subscribe(items => {
    //       this.emplist.set(items);
    //     });
    //   });
    // }

  }



}
