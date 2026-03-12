import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NUsersBlockShopList } from './n-usersblockshop-list';

describe('NUsersBlockShopList', () => {
    let component: NUsersBlockShopList;
    let fixture: ComponentFixture<NUsersBlockShopList>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NUsersBlockShopList]
        })
            .compileComponents();

        fixture = TestBed.createComponent(NUsersBlockShopList);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
