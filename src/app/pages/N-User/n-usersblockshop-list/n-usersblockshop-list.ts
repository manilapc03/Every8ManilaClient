import { Component, inject, signal, computed, input, model, effect, OnInit } from '@angular/core';
import { NUsersBlockShopServiceAPI } from '../../../services/N-UsersBlockShop/n-usersblockshop-service.api';
import { ResponseData } from '../../../shared/response-data';
import { NUsersBlockShopModel } from '../../../model/N-UsersBlockShop/n-usersblockshop.model';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/Auth/auth-service';

@Component({
    selector: 'app-n-usersblockshop-list',
    imports: [],
    templateUrl: './n-usersblockshop-list.html',
    styleUrl: './n-usersblockshop-list.css',
})
export class NUsersBlockShopList implements OnInit {

    //this.authService.refreshToken();    

    showTables = true;
    router = inject(Router);

    authService = inject(AuthService);
    usersBlockShopService = inject(NUsersBlockShopServiceAPI);

    selectedSearchBy = model<string | null>("name");
    onChangeSearchBy(event: Event) {
        const value = (event.target as HTMLSelectElement).value;
        this.selectedSearchBy.set(value.toString());
    }

    searchInput = model<string | null>("");
    updateInputSearch(value: string) {
        this.searchInput.set(value);
    }

    filterHandler() {
        if (this.searchInput()?.trim() === '') {
            this.selectedSearchBy.set('');
        }
        if (this.selectedSearchBy()?.trim() === "") {
            this.searchInput.set("");
        }
        this.currentPage.set(1);
        this.updatePage();
    }

    selectedPagesize = model<string | null>("10");
    pageInput = model<number>(1);

    pageSize = signal<number>(10);;
    currentPage = signal<number>(1);

    pageDataList = computed(() => {
        return this.usersBlockShopService.dataList().data
    });

    pageData = computed(() => {
        return this.usersBlockShopService.data().data
    });

    onChangePagesize(event: Event) {
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
        if (page < 1 || page > this.usersBlockShopService.dataList().totalPages) {
            return;
        }
        this.currentPage.set(page);
        this.updatePage();
    }

    updatePage() {
        try {
            this.usersBlockShopService.getUsersBlockShopList(this.currentPage(), this.pageSize(), this.selectedSearchBy(), this.searchInput()).unsubscribe();
            this.usersBlockShopService.getUsersBlockShopList(this.currentPage(), this.pageSize(), this.selectedSearchBy(), this.searchInput());
        } catch (error) {
            // Code to handle the error
        } finally {
            //
            //alert("updatePage()");
        }

    }

    ngOnInit() {
        this.currentPage.set(1);
        // this.usersBlockShopService.getUsersBlockShopList(this.currentPage(), this.pageSize());
        this.updatePage();
    }

    nextPage() {
        if (this.currentPage() < this.usersBlockShopService.dataList().totalPages) {
            this.currentPage.update(currentValue => currentValue + 1);

            this.updatePage();
        }
    }

    prevPage() {
        if ((this.currentPage() > 1) && (this.usersBlockShopService.dataList().totalPages > 0)) {
            this.currentPage.update(currentValue => currentValue - 1);
            this.updatePage();
        }
    }


    addHandler() {

    }

    editHandler(id: number) {
        //alert("editHandler:"+id);

        this.usersBlockShopService.getUsersBlockShopById(id).unsubscribe();
        this.usersBlockShopService.getUsersBlockShopById(id);


        //this.router.navigate(['/editemployee', id]);
    }

    deleteHandler(id: number) {
        if (confirm('Are you sure to delete this UsersBlockShop?')) {
            this.usersBlockShopService.deleteUsersBlockShopById(id);
            this.updatePage();
        }
    }



}
