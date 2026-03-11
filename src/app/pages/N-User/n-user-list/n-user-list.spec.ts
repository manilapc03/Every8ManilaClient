import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NUserList } from './n-user-list';

describe('NUserList', () => {
  let component: NUserList;
  let fixture: ComponentFixture<NUserList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NUserList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NUserList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
