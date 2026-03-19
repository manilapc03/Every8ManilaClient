import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NUserEdit } from './n-user-edit';

describe('NUserEdit', () => {
  let component: NUserEdit;
  let fixture: ComponentFixture<NUserEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NUserEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NUserEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
