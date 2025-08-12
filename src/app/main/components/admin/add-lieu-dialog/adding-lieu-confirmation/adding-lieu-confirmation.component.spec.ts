import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingLieuConfirmationComponent } from './adding-lieu-confirmation.component';

describe('AddingLieuConfirmationComponent', () => {
  let component: AddingLieuConfirmationComponent;
  let fixture: ComponentFixture<AddingLieuConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddingLieuConfirmationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddingLieuConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
