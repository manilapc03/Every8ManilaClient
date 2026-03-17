import { Component, inject, signal, computed, input, model, effect, OnInit } from '@angular/core';
import { NUsersJobProfServiceAPI } from '../../../services/N-UsersJobProf/n-usersjobprof-service-api';
import { ResponseData } from '../../../shared/response-data';
import { NUsersJobProfModel } from '../../../model/N-UsersJobProf/n-usersjobprof.model';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/Auth/auth-service';


@Component({
    selector: 'app-n-usersjobprof-list',
    imports: [],
    templateUrl: './n-usersjobprof-list.html',
    styleUrl: './n-usersjobprof-list.css',
})
export class NUsersJobProfList implements OnInit {

    //this.authService.refreshToken();    

    showTables = true;
    router = inject(Router);

    authService = inject(AuthService);
    usersJobProfService = inject(NUsersJobProfServiceAPI);

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
        //console.log(this.userService.dataList().data);
        return this.usersJobProfService.dataList().data
    });

    pageData = computed(() => {
        return this.usersJobProfService.data().data
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
        if (page < 1 || page > this.usersJobProfService.dataList().totalPages) {
            return;
        }
        this.currentPage.set(page);
        this.updatePage();
    }

    updatePage() {
        try {
            this.usersJobProfService.getUsersJobProfList(this.currentPage(), this.pageSize(), this.selectedSearchBy(), this.searchInput()).unsubscribe();
            this.usersJobProfService.getUsersJobProfList(this.currentPage(), this.pageSize(), this.selectedSearchBy(), this.searchInput());

        } catch (error) {
            // Code to handle the error
        } finally {
            //
            //alert("updatePage()");
        }

    }

    ngOnInit() {

        this.currentPage.set(1);
        //this.usersJobProfService.getUsersJobProfList(this.currentPage(), this.pageSize());
        this.updatePage();
    }

    nextPage() {
        if (this.currentPage() < this.usersJobProfService.dataList().totalPages) {
            this.currentPage.update(currentValue => currentValue + 1);

            this.updatePage();
        }
    }

    prevPage() {
        if ((this.currentPage() > 1) && (this.usersJobProfService.dataList().totalPages > 0)) {
            this.currentPage.update(currentValue => currentValue - 1);
            this.updatePage();
        }
    }


    addHandler() {

    }

    editHandler(id: number) {
        //alert("editHandler:"+id);

        this.usersJobProfService.getUsersJobProfById(id).unsubscribe();
        this.usersJobProfService.getUsersJobProfById(id);


        //this.router.navigate(['/editemployee', id]);
    }

    deleteHandler(id: number) {
        if (confirm('Are you sure to delete this UsersJobProf?')) {
            this.usersJobProfService.deleteUsersJobProfById(id);
            this.updatePage();
        }
    }
}
