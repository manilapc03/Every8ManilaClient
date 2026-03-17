import { Component, inject, signal, computed, input, model, effect, OnInit } from '@angular/core';
import { NShopBackServiceAPI } from '../../../services/N-ShopBack/n-shopback-service-api';
import { ResponseData } from '../../../shared/response-data';
import { NShopBackModel } from '../../../model/N-ShopBack/n-shopback.model';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/Auth/auth-service';

@Component({
  selector: 'app-n-shopback-list',
  imports: [],
  templateUrl: './n-shopback-list.html',
  styleUrl: './n-shopback-list.css',
})
export class NShopBackList implements OnInit {

  showTables = true;
  router = inject(Router);

  authService = inject(AuthService);

  shopBackService = inject(NShopBackServiceAPI);

  selectedPagesize = model<string | null>("10");
  pageInput = model<number>(1);

  pageSize = signal<number>(10);
  currentPage = signal<number>(1);

  pageDataList = computed(() => {
    return this.shopBackService.dataList().data
  });

  pageData = computed(() => {
    return this.shopBackService.data().data
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
    if (page < 1 || page > this.shopBackService.dataList().totalPages) {
      return;
    }
    this.currentPage.set(page);
    this.updatePage();
  }

  updatePage() {
    try {
      this.shopBackService.getShopBackList(this.currentPage(), this.pageSize()).unsubscribe();
      this.shopBackService.getShopBackList(this.currentPage(), this.pageSize());

    } catch (error) {

    } finally {

    }
  }

  ngOnInit() {
    this.currentPage.set(1);
    this.shopBackService.getShopBackList(this.currentPage(), this.pageSize());
    this.updatePage();
  }

  nextPage() {
    if (this.currentPage() < this.shopBackService.dataList().totalPages) {
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

    this.shopBackService.getShopBackById(id).unsubscribe();
    this.shopBackService.getShopBackById(id);

  }

  deleteHandler(id: string) {

    if (confirm('Are you sure to delete this Shop?')) {
      this.shopBackService.deleteShopBackById(id);
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

  handleShopBackList() {
    this.router.navigateByUrl("/shopBackList")
  }

  handleUserList() {
    this.router.navigateByUrl("/userlist")
  }

  handleUsersBlockShopBackList() {
    this.router.navigateByUrl("/usersblockshopBacklist")
  }

}