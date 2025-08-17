import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogComponent } from './dialog.component';
import { HttpCallsService } from 'src/app/main/services/httpCalls.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { ReservationsActions } from '../../../../enums/admin'

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  let httpServiceSpy: jasmine.SpyObj<HttpCallsService>;

  const mockReservation = {
    id: 1,
    lieu: { /* remplis selon ton interface Lieu */ },
    start_date: '2025-08-01',
    end_date: '2025-08-05',
    nb_person: 2,
    reference: 'REF123',
    attendees: [{ name: 'John Doe' }], // selon ton interface Attendee
    status: 'CONFIRMED'
  };

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('HttpCallsService', ['updateReservationStatus']);

    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        { provide: HttpCallsService, useValue: spy },
        { provide: MAT_DIALOG_DATA, useValue: { reservation: mockReservation } }
      ]
    }).compileComponents();

    httpServiceSpy = TestBed.inject(HttpCallsService) as jasmine.SpyObj<HttpCallsService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;

    component.reloadPage = jasmine.createSpy('reloadPage');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not call updateReservationStatus if action is CANCEL', () => {
    // on définit quand même le spy pour éviter l'erreur
    httpServiceSpy.updateReservationStatus.and.returnValue(of({}));

    component.updateReservation(ReservationsActions.CANCEL);
    expect(httpServiceSpy.updateReservationStatus).not.toHaveBeenCalled();
  });

  it('should call updateReservationStatus and reloadPage on update', () => {
    httpServiceSpy.updateReservationStatus.and.returnValue(of({}));
    component.updateReservation('CONFIRMED');
    expect(httpServiceSpy.updateReservationStatus).toHaveBeenCalledWith(mockReservation.id, {
      id: mockReservation.id,
      status: 'CONFIRMED'
    });
    expect(component.reloadPage).toHaveBeenCalled();
  });

  it('should calculate number of days correctly', () => {
    const days = component.calculateNumberOfDays();
    expect(days).toBe(4); // du 1er au 5 août = 4 jours
  });
});
