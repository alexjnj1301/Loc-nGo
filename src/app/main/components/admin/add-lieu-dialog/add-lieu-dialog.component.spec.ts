import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddLieuDialogComponent } from './add-lieu-dialog.component';
import { HttpCallsService } from '../../../services/httpCalls.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

// Mock du service
class MockHttpCallsService {
  getAllServices() {
    return of([]);
  }
  getLieuById(id: string) {
    return of({ id, name: 'Lieu test' });
  }
  addLieu(data: any) {
    return of(data);
  }
}

describe('AddLieuDialogComponent', () => {
  let component: AddLieuDialogComponent;
  let fixture: ComponentFixture<AddLieuDialogComponent>;
  let httpService: HttpCallsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TranslateModule.forRoot()],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: HttpCallsService, useClass: MockHttpCallsService },
        { provide: MAT_DIALOG_DATA, useValue: { id: 1 } },
        { provide: MatDialog, useValue: { open: jasmine.createSpy('open') } }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLieuDialogComponent);
    component = fixture.componentInstance;
    httpService = TestBed.inject(HttpCallsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.lieuForm).toBeDefined();
    expect(component.lieuForm.controls['name']).toBeDefined();
  });

  it('should fetch all services on init', () => {
    spyOn(httpService, 'getAllServices').and.callThrough();
    component.ngOnInit();
    expect(httpService.getAllServices).toHaveBeenCalled();
    expect(component.services.length).toBe(0);
  });

  it('should add a lieu', () => {
    spyOn(httpService, 'addLieu').and.callThrough();
    component.lieuForm.setValue({
      name: 'Test Lieu',
      address: 'Adresse',
      city: 'Ville',
      postal_code: '12345',
      description: 'Desc',
      price: 100
    });
    component.addLieu();
    expect(httpService.addLieu).toHaveBeenCalled();
    expect(component.lieu?.name).toBe('Test Lieu');
  });

  it('should add or remove services with manageService', () => {
    component.selectedServices = [1, 2];
    component.manageService(3);
    expect(component.selectedServices).toEqual([1, 2, 3]); // ajout
    component.manageService(2);
    expect(component.selectedServices).toEqual([1, 3]); // suppression
  });

  it('should update file on onFileSelected', () => {
    const file = new File(['content'], 'test.png', { type: 'image/png' });
    const event = { target: { files: [file] } } as unknown as Event;
    component.onFileSelected(event);
    expect(component.file).toBe(file);
  });

  it('should open dialog with setFavoriteImage', () => {
    component.lieu = { id: 1, name: 'Test Lieu' } as any;
    const dialog = TestBed.inject(MatDialog);
    component.setFavoriteImage('url', 123);
    expect(dialog.open).toHaveBeenCalledWith(
      jasmine.any(Function),
      jasmine.objectContaining({
        data: { imageUrl: 'url', lieuId: 1, imageId: 123 }
      })
    );
  });
});
