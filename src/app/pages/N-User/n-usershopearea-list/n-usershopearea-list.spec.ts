import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NUsersHopeAreaList } from './n-usershopearea-list';

describe('NUsersHopeAreaList', () => {
    let component: NUsersHopeAreaList;
    let fixture: ComponentFixture<NUsersHopeAreaList>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NUsersHopeAreaList]
        })
            .compileComponents();

        fixture = TestBed.createComponent(NUsersHopeAreaList);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
