import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NUsersFavoriteShopList } from './n-usersfavoriteshop-list';

describe('NUsersFavoriteShopList', () => {
    let component: NUsersFavoriteShopList;
    let fixture: ComponentFixture<NUsersFavoriteShopList>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NUsersFavoriteShopList]
        })
            .compileComponents();

        fixture = TestBed.createComponent(NUsersFavoriteShopList);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
