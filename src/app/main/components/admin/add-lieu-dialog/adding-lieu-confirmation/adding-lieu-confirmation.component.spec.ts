import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddingLieuConfirmationComponent } from './adding-lieu-confirmation.component';
import { TranslateModule } from '@ngx-translate/core';

describe('AddingLieuConfirmationComponent', () => {
  let component: AddingLieuConfirmationComponent;
  let fixture: ComponentFixture<AddingLieuConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddingLieuConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call reloadPage on close', () => {
    spyOn(component, 'reloadPage');
    component.close();
    expect(component.reloadPage).toHaveBeenCalled();
  });
});
