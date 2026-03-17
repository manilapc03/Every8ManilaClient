import { Component, inject, signal, computed, input, model, effect, OnInit } from '@angular/core';
import { NAccessCountServiceAPI } from '../../../services/N-AccessCount/n-accesscount-service-api';
import { ResponseData } from '../../../shared/response-data';
import { NAccessCountModel } from '../../../model/N-AccessCount/n-accesscount.model';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/Auth/auth-service';

@Component({
    selector: 'app-n-accesscount-list',
    imports: [],
    templateUrl: './n-accesscount-list.html',
    styleUrl: './n-accesscount-list.css',
})
export class NAccessCountList implements OnInit {

    //this.authService.refreshToken();    

    showTables = true;
    router = inject(Router);

    authService = inject(AuthService);
    accessCountService = inject(NAccessCountServiceAPI);

    // 1. Add the 4 new Signals
    ymdInput = signal<string>("");
    chihouIdInput = signal<string>("");
    typeInput = signal<string>("");
    pageIdInput = signal<string>("");

    // 2. Add the update methods called by your HTML (input) events
    updateYmd(value: string) { this.ymdInput.set(value); }
    updateChihouId(value: string) { this.chihouIdInput.set(value); }
    updateType(value: string) { this.typeInput.set(value); }
    updatePageId(value: string) { this.pageIdInput.set(value); }

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
        return this.accessCountService.dataList().data
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
        if (page < 1 || page > this.accessCountService.dataList().totalPages) {
            return;
        }
        this.currentPage.set(page);
        this.updatePage();
    }

    updatePage() {
        try {
            // Pass the 4 new signal values into the service!
            this.accessCountService.getAccessCountList(
                this.currentPage(),
                this.pageSize(),
                this.ymdInput(),
                this.chihouIdInput(),
                this.typeInput(),
                this.pageIdInput()
            );
        } catch (error) {
            // Code to handle the error
        }
    }

    ngOnInit() {
        this.currentPage.set(1);
        // this.accessCountService.accessCountList(this.currentPage(), this.pageSize());
        this.updatePage();
    }

    nextPage() {
        if (this.currentPage() < this.accessCountService.dataList().totalPages) {
            this.currentPage.update(currentValue => currentValue + 1);

            this.updatePage();
        }
    }

    prevPage() {
        if ((this.currentPage() > 1) && (this.accessCountService.dataList().totalPages > 0)) {
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
        //     this.accessCountService.deleteAccessCountById(id);
        //     this.updatePage();
        // }
    }
}
