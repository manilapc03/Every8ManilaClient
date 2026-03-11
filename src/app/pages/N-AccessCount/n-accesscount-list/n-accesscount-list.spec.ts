import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NAccessCountList } from './n-accesscount-list';

describe('NAccessCountList', () => {
    let component: NAccessCountList;
    let fixture: ComponentFixture<NAccessCountList>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NAccessCountList]
        })
            .compileComponents();

        fixture = TestBed.createComponent(NAccessCountList);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
