import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NShopList } from './n-shop-list'

describe('NShopList', () => {
    let component: NShopList;
    let fixture: ComponentFixture<NShopList>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NShopList]
        })
            .compileComponents();

        fixture = TestBed.createComponent(NShopList);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
