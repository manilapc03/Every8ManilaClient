import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NUsersLogList } from './n-userslog-list';

describe('NUsersLogList', () => {
    let component: NUsersLogList;
    let fixture: ComponentFixture<NUsersLogList>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NUsersLogList]
        })
            .compileComponents();

        fixture = TestBed.createComponent(NUsersLogList);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
