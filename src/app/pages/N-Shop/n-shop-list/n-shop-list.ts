import { Component, inject, signal, computed, input, model, effect, OnInit } from '@angular/core';
import { NShopServiceAPI } from '../../../services/N-Shop/n-shop-service-api';
import { ResponseData } from '../../../shared/response-data';
import { NShopModel } from '../../../model/N-Shop/n-shop.model';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/Auth/auth-service';

@Component({
  selector: 'app-n-shop-list',
  imports: [],
  templateUrl: './n-shop-list.html',
  styleUrl: './n-shop-list.css',
})
export class NShopList implements OnInit {

  showTables = true;
  router = inject(Router);

  authService = inject(AuthService);

  shopService = inject(NShopServiceAPI);

  selectedPagesize = model<string | null>("10");
  pageInput = model<number>(1);

  pageSize = signal<number>(10);
  currentPage = signal<number>(1);

  pageDataList = computed(() => {
    return this.shopService.dataList().data
  });

  pageData = computed(() => {
    return this.shopService.data().data
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
    if (page < 1 || page > this.shopService.dataList().totalPages) {
      return;
    }
    this.currentPage.set(page);
    this.updatePage();
  }

  updatePage() {
    try {
      this.shopService.getShopList(this.currentPage(), this.pageSize()).unsubscribe();
      this.shopService.getShopList(this.currentPage(), this.pageSize());

    } catch (error) {

    } finally {

    }
  }

  ngOnInit() {
    this.currentPage.set(1);
    this.shopService.getShopList(this.currentPage(), this.pageSize());
    this.updatePage();
  }

  nextPage() {
    if (this.currentPage() < this.shopService.dataList().totalPages) {
      this.currentPage.update(currentValue => currentValue + 1);

      this.updatePage();
    }
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update(currentValue => currentValue - 1);
      this.updatePage();
    }
  }

  addHandler() {

  }

  editHandler(id: string) {

    this.shopService.getShopById(id).unsubscribe();
    this.shopService.getShopById(id);

  }

  deleteHandler(id: string) {

    if (confirm('Are you sure to delete this Shop?')) {
      this.shopService.deleteShopById(id);
    }

  }

  handlelogout() {
    this.authService.logout();
  }

  handleRefreshToken() {
    this.authService.refreshToken();
  }

  handleHomePage() {
    this.router.navigateByUrl("/")
  }

  handleAccessCountList() {
    this.router.navigateByUrl("/accesscountlist")
  }

  handleShopList() {
    this.router.navigateByUrl("/shopList")
  }

  handleUserList() {
    this.router.navigateByUrl("/userlist")
  }

  handleUsersBlockShopList() {
    this.router.navigateByUrl("/usersblockshoplist")
  }

}