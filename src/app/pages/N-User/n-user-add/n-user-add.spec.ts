import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NUserAdd } from './n-user-add';

describe('NUserAdd', () => {
  let component: NUserAdd;
  let fixture: ComponentFixture<NUserAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NUserAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NUserAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
