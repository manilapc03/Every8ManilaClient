import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NUsersLoginHistoryList } from './n-usersloginhistory-list';

describe('NUsersLoginHistoryList', () => {
    let component: NUsersLoginHistoryList;
    let fixture: ComponentFixture<NUsersLoginHistoryList>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NUsersLoginHistoryList]
        })
            .compileComponents();

        fixture = TestBed.createComponent(NUsersLoginHistoryList);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
