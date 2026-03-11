import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { NShopServiceAPI } from '../../services/N-Shop/n-shop-service-api';
import { ResponseData } from '../../shared/response-data';
import { NShopModel } from '../../model/N-Shop/n-shop.model';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-n-shop-list',
  imports: [],
  templateUrl: './n-shop-list.html',
  styleUrl: './n-shop-list.css',
})
export class NShopList implements OnInit {

  shopService = inject(NShopServiceAPI);

  pageSize = signal<number>(10);;
  currentPage = signal<number>(1);

  pageData = computed(() => {
    return this.shopService.dataList().data
  });


  updatePage() { 
    try {
      this.shopService.shopList(this.currentPage(),this.pageSize()).unsubscribe();
      this.shopService.shopList(this.currentPage(),this.pageSize());
      //this.totalPage.set(this.shopService.dataList().totalPages);
    } catch (error) {
      // Code to handle the error
    } finally {
      //
       //alert("updatePage()");
    }

  }

  ngOnInit() {
    this.currentPage.set(1);
    this.shopService.shopList(this.currentPage(),this.pageSize());
    this.updatePage();
  }

  nextPage(){
    if(this.currentPage() < this.shopService.dataList().totalPages){
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

  goToPage(page: number): void {
    if (page < 1 || page > this.shopService.dataList().totalPages) {
      return;
    }
    this.currentPage.set(page);
    this.updatePage();
  }


  addHandler(){

  }

  editHandler(id: string) {
    alert("editHandler:"+id);
  }

  deleteHandler(id: string) {
    alert("deleteHandler:"+id);
  }

}