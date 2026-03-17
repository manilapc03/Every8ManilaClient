import { Component, inject, signal, computed, input, model, effect, OnInit } from '@angular/core';
import { NShopTainyuuIdentificationShopServiceAPI } from '../../../services/N-ShopTainyuuIdentificationShop/n-shoptainyuuidentificationshop-service-api';
import { ResponseData } from '../../../shared/response-data';
import { NShopTainyuuIdentificationShopModel } from '../../../model/N-ShopTainyuuIdentificationShop/n-shoptainyuuidentificationshop.model';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/Auth/auth-service';

@Component({
  selector: 'app-n-shoptainyuuidentificationshop-list',
  imports: [],
  templateUrl: './n-shoptainyuuidentificationshop-list.html',
  styleUrl: './n-shoptainyuuidentificationshop-list.css',
})
export class NShopTainyuuIdentificationShopList implements OnInit {

  showTables = true;
  router = inject(Router);

  authService = inject(AuthService);

  shopTainyuuIdentificationShopService = inject(NShopTainyuuIdentificationShopServiceAPI);

  selectedPagesize = model<string | null>("10");
  pageInput = model<number>(1);

  pageSize = signal<number>(10);
  currentPage = signal<number>(1);

  pageDataList = computed(() => {
    return this.shopTainyuuIdentificationShopService.dataList().data
  });

  pageData = computed(() => {
    return this.shopTainyuuIdentificationShopService.data().data
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
    if (page < 1 || page > this.shopTainyuuIdentificationShopService.dataList().totalPages) {
      return;
    }
    this.currentPage.set(page);
    this.updatePage();
  }

  updatePage() {
    try {
      this.shopTainyuuIdentificationShopService.getShopTainyuuIdentificationShopList(this.currentPage(), this.pageSize()).unsubscribe();
      this.shopTainyuuIdentificationShopService.getShopTainyuuIdentificationShopList(this.currentPage(), this.pageSize());

    } catch (error) {

    } finally {

    }
  }

  ngOnInit() {
    this.currentPage.set(1);
    this.shopTainyuuIdentificationShopService.getShopTainyuuIdentificationShopList(this.currentPage(), this.pageSize());
    this.updatePage();
  }

  nextPage() {
    if (this.currentPage() < this.shopTainyuuIdentificationShopService.dataList().totalPages) {
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

    this.shopTainyuuIdentificationShopService.getShopTainyuuIdentificationShopById(id).unsubscribe();
    this.shopTainyuuIdentificationShopService.getShopTainyuuIdentificationShopById(id);

  }

  deleteHandler(id: string) {

    if (confirm('Are you sure to delete this ShopTainyuuIdentificationShop?')) {
      this.shopTainyuuIdentificationShopService.deleteShopTainyuuIdentificationShopById(id);
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

  handleShopTainyuuIdentificationShopList() {
    this.router.navigateByUrl("/shopTainyuuIdentificationShopList")
  }

  handleUserList() {
    this.router.navigateByUrl("/userlist")
  }

  handleUsersBlockShopBackList() {
    this.router.navigateByUrl("/usersblockshopBacklist")
  }

}