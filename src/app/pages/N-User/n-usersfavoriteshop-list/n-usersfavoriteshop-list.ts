import { Component, inject, signal, computed, input, model, effect, OnInit } from '@angular/core';
import { NUsersFavoriteShopServiceAPI } from '../../../services/N-UsersFavoriteShop/n-usersfavoriteshop-service-api';
import { ResponseData } from '../../../shared/response-data';
import { NUsersFavoriteShopModel } from '../../../model/N-UsersFavoriteShop/n-usersfavoriteshop.model';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/Auth/auth-service';

@Component({
    selector: 'app-n-usersfavoriteshop-list',
    imports: [],
    templateUrl: './n-usersfavoriteshop-list.html',
    styleUrl: './n-usersfavoriteshop-list.css',
})
export class NUsersFavoriteShopList implements OnInit {

    //this.authService.refreshToken();    

    showTables = true;
    router = inject(Router);

    authService = inject(AuthService);
    usersFavoriteShop = inject(NUsersFavoriteShopServiceAPI);

    // 1. Add the new Signals
    uidInput = signal<string>("");
    shop_idInput = signal<string>("");

    // 2. Add the update methods called by your HTML (input) events
    updateUid(value: string) { this.uidInput.set(value); }
    updateShop_id(value: string) { this.shop_idInput.set(value); }

    // 3. Update the filter handler
    filterHandler() {
        this.currentPage.set(1);
        this.updatePage();
    }

    selectedPagesize = model<string | null>("10");
    pageInput = model<number>(1);

    pageSize = signal<number>(10);;
    currentPage = signal<number>(1);

    pageData = computed(() => {
        return this.usersFavoriteShop.dataList().data
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
        if (page < 1 || page > this.usersFavoriteShop.dataList().totalPages) {
            return;
        }
        this.currentPage.set(page);
        this.updatePage();
    }

    updatePage() {
        try {
            // Pass the 4 new signal values into the service!
            this.usersFavoriteShop.getUsersFavoriteShopList(
                this.currentPage(),
                this.pageSize(),
                this.uidInput(),
                this.shop_idInput()
            );
        } catch (error) {
            // Code to handle the error
        }
    }

    ngOnInit() {
        this.currentPage.set(1);
        // this.usersFavoriteShop.accessCountList(this.currentPage(), this.pageSize());
        this.updatePage();
    }

    nextPage() {
        if (this.currentPage() < this.usersFavoriteShop.dataList().totalPages) {
            this.currentPage.update(currentValue => currentValue + 1);

            this.updatePage();
        }
    }

    prevPage() {
        if ((this.currentPage() > 1) && (this.usersFavoriteShop.dataList().totalPages > 0)) {
            this.currentPage.update(currentValue => currentValue - 1);
            this.updatePage();
        }
    }


    addHandler() {

    }

    editHandler(id: string) {
        alert("editHandler:" + id);
        //this.router.navigate(['/editemployee', id]);
    }

    deleteHandler(id: string) {
        // if (confirm('Are you sure to delete this AccessCount?')) {
        //     this.usersFavoriteShop.deleteAccessCountById(id);
        //     this.updatePage();
        // }
    }
}
