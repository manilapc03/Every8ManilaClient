import { Component, inject, signal, computed, input, model, effect, OnInit } from '@angular/core';
import { NShopBackUpFlgServiceAPI } from '../../../services/N-ShopBackUpFlg/n-shopbackupflg-service-api';
import { ResponseData } from '../../../shared/response-data';
import { NShopBackUpFlgModel } from '../../../model/N-ShopBackUpFlg/n-shopbackupflg.model';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/Auth/auth-service';

@Component({
  selector: 'app-n-shopbackupflg-list',
  imports: [],
  templateUrl: './n-shopbackupflg-list.html',
  styleUrl: './n-shopbackupflg-list.css',
})
export class NShopBackUpFlgList implements OnInit {

  showTables = true;
  router = inject(Router);

  authService = inject(AuthService);

  shopBackUpFlgService = inject(NShopBackUpFlgServiceAPI);

  selectedPagesize = model<string | null>("10");
  pageInput = model<number>(1);

  pageSize = signal<number>(10);
  currentPage = signal<number>(1);

  pageDataList = computed(() => {
    return this.shopBackUpFlgService.dataList().data
  });

  pageData = computed(() => {
    return this.shopBackUpFlgService.data().data
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
    if (page < 1 || page > this.shopBackUpFlgService.dataList().totalPages) {
      return;
    }
    this.currentPage.set(page);
    this.updatePage();
  }

  updatePage() {
    try {
      this.shopBackUpFlgService.getShopBackUpFlgList(this.currentPage(), this.pageSize()).unsubscribe();
      this.shopBackUpFlgService.getShopBackUpFlgList(this.currentPage(), this.pageSize());

    } catch (error) {

    } finally {

    }
  }

  ngOnInit() {
    this.currentPage.set(1);
    this.shopBackUpFlgService.getShopBackUpFlgList(this.currentPage(), this.pageSize());
    this.updatePage();
  }

  nextPage() {
    if (this.currentPage() < this.shopBackUpFlgService.dataList().totalPages) {
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

    this.shopBackUpFlgService.getShopBackUpFlgById(id).unsubscribe();
    this.shopBackUpFlgService.getShopBackUpFlgById(id);

  }

  deleteHandler(id: string) {

    if (confirm('Are you sure to delete this ShopBackUpFlg?')) {
      this.shopBackUpFlgService.deleteShopBackUpFlgById(id);
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