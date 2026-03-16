import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NUsersJobProfList } from './n-usersjobprof-list';

describe('NUsersJobProfList', () => {
    let component: NUsersJobProfList;
    let fixture: ComponentFixture<NUsersJobProfList>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NUsersJobProfList]
        })
            .compileComponents();

        fixture = TestBed.createComponent(NUsersJobProfList);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
