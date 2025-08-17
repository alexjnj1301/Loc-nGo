import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TitlePictureComponent } from './title-picture.component';

describe('TitlePictureComponent', () => {
  let component: TitlePictureComponent;
  let fixture: ComponentFixture<TitlePictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitlePictureComponent] // standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(TitlePictureComponent);
    component = fixture.componentInstance;

    // ✅ On initialise l'input obligatoire
    component.title = 'Test Title';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct title', () => {
    expect(component.title).toBe('Test Title');
  });
});
