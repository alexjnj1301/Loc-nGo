import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLieuDialogComponent } from './add-lieu-dialog.component';

describe('AddLieuDialogComponent', () => {
  let component: AddLieuDialogComponent;
  let fixture: ComponentFixture<AddLieuDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddLieuDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLieuDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
