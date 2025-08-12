import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetFavoriteImageDialogComponent } from './set-favorite-image-dialog.component';

describe('SetFavoriteImageDialogComponent', () => {
  let component: SetFavoriteImageDialogComponent;
  let fixture: ComponentFixture<SetFavoriteImageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetFavoriteImageDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetFavoriteImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
