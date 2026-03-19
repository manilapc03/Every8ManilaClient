import { Component, inject, signal, computed, input, model, effect, OnInit } from '@angular/core';
import { NUsersHopeAreaServiceAPI } from '../../../services/N-UsersHopeArea/n-usershopearea-service.api';
import { ResponseData } from '../../../shared/response-data';
import { NUsersHopeAreaModel } from '../../../model/N-UsersHopeArea/n-usershopearea.model';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/Auth/auth-service';

@Component({
    selector: 'app-n-usershopearea-list',
    imports: [],
    templateUrl: './n-usershopearea-list.html',
    styleUrl: './n-usershopearea-list.css',
})
export class NUsersHopeAreaList implements OnInit {

    //this.authService.refreshToken();    

    showTables = true;
    router = inject(Router);

    authService = inject(AuthService);
    usersHopeArea = inject(NUsersHopeAreaServiceAPI);

    // 1. Add the new Signals
    uidInput = signal<string>("");
    area_idInput = signal<string>("");

    // 2. Add the update methods called by your HTML (input) events
    updateUid(value: string) { this.uidInput.set(value); }
    updateArea_id(value: string) { this.area_idInput.set(value); }

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
        return this.usersHopeArea.dataList().data
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
        if (page < 1 || page > this.usersHopeArea.dataList().totalPages) {
            return;
        }
        this.currentPage.set(page);
        this.updatePage();
    }

    updatePage() {
        try {
            // Pass the new signal values into the service!
            this.usersHopeArea.getUsersHopeAreaList(
                this.currentPage(),
                this.pageSize(),
                this.uidInput(),
                this.area_idInput()
            );
        } catch (error) {
            // Code to handle the error
        }
    }

    ngOnInit() {
        this.currentPage.set(1);
        // this.usersHopeArea.accessCountList(this.currentPage(), this.pageSize());
        this.updatePage();
    }

    nextPage() {
        if (this.currentPage() < this.usersHopeArea.dataList().totalPages) {
            this.currentPage.update(currentValue => currentValue + 1);

            this.updatePage();
        }
    }

    prevPage() {
        if ((this.currentPage() > 1) && (this.usersHopeArea.dataList().totalPages > 0)) {
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
        //     this.usersHopeArea.deleteAccessCountById(id);
        //     this.updatePage();
        // }
    }
}
