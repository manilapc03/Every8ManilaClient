import { Component, inject, signal, computed, input, model, effect, OnInit } from '@angular/core';
import { NUsersLogServiceAPI } from '../../../services/N-UsersLog/n-userslog-service.api';
import { ResponseData } from '../../../shared/response-data';
import { NUsersLogModel } from '../../../model/N-UsersLog/n-userslog.model';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/Auth/auth-service';

@Component({
    selector: 'app-n-userslog-list',
    imports: [],
    templateUrl: './n-userslog-list.html',
    styleUrl: './n-userslog-list.css',
})
export class NUsersLogList implements OnInit {

    //this.authService.refreshToken();    

    showTables = true;
    router = inject(Router);

    authService = inject(AuthService);
    usersLog = inject(NUsersLogServiceAPI);

    // 1. Add the new Signals
    create_dateInput = signal<string>("");
    chihou_idInput = signal<string>("");

    // 2. Add the update methods called by your HTML (input) events
    updateCreate_date(value: string) { this.create_dateInput.set(value); }
    updateChihou_id(value: string) { this.chihou_idInput.set(value); }

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
        return this.usersLog.dataList().data
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
        if (page < 1 || page > this.usersLog.dataList().totalPages) {
            return;
        }
        this.currentPage.set(page);
        this.updatePage();
    }

    updatePage() {
        try {
            // Pass the new signal values into the service!
            this.usersLog.getUsersLogList(
                this.currentPage(),
                this.pageSize(),
                this.create_dateInput(),
                this.chihou_idInput()
            );
        } catch (error) {
            // Code to handle the error
        }
    }

    ngOnInit() {
        this.currentPage.set(1);
        // this.usersLog.accessCountList(this.currentPage(), this.pageSize());
        this.updatePage();
    }

    nextPage() {
        if (this.currentPage() < this.usersLog.dataList().totalPages) {
            this.currentPage.update(currentValue => currentValue + 1);

            this.updatePage();
        }
    }

    prevPage() {
        if ((this.currentPage() > 1) && (this.usersLog.dataList().totalPages > 0)) {
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
        //     this.usersLog.deleteAccessCountById(id);
        //     this.updatePage();
        // }
    }
}
