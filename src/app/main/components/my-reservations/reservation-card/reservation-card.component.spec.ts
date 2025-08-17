import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservationCardComponent } from './reservation-card.component';
import { Reservation } from '../../../../models/ReservationPerUser';
import { TranslateModule } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';

describe('ReservationCardComponent', () => {
  let component: ReservationCardComponent;
  let fixture: ComponentFixture<ReservationCardComponent>;

  const mockReservation: Reservation = {
    id: 1,
    lieu: {
      id: 10,
      name: 'Maison du Test',
      address: '123 Rue Exemple',
      city: 'Paris',
      postal_code: '75001',
      price: 100
    },
    start_date: '2025-08-17T10:00:00',
    end_date: '2025-08-17T12:00:00',
    nb_person: 2,
    reference: 'REF123',
    attendees: [],
    status: 'confirmed'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReservationCardComponent,
        TranslateModule.forRoot(),
        MatChipsModule
      ],
      providers: [DatePipe]
    }).compileComponents();

    fixture = TestBed.createComponent(ReservationCardComponent);
    component = fixture.componentInstance;
    component.reservation = mockReservation;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the reservation input defined', () => {
    expect(component.reservation).toEqual(mockReservation);
  });
});
