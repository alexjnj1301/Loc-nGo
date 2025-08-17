import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing'
import { MyReservationsComponent } from './my-reservations.component'
import { HttpCallsService } from '../../services/httpCalls.service'
import { AuthenticationService } from '../../services/authentication.service'
import { MatDialog } from '@angular/material/dialog'
import { of } from 'rxjs'
import { Lieu, Reservation } from '../../../models/ReservationPerUser'
import { AllLieuResponse } from '../../../models/LieuModels'
import { TranslateModule } from '@ngx-translate/core'

describe('MyReservationsComponent', () => {
  let component: MyReservationsComponent
  let fixture: ComponentFixture<MyReservationsComponent>
  let httpCallServiceMock: Partial<HttpCallsService>
  let authServiceMock: Partial<AuthenticationService>
  let matDialogMock: Partial<MatDialog>

  const mockUser = { id: 1, firstname: 'John', lastname: 'Doe', email: '', roles: [] }
  const mockLieux: AllLieuResponse[] = [{ id: 10, name: 'Lieu A' } as AllLieuResponse]
  const mockLieu: Lieu = {
    id: 10,
    name: 'Maison du Test',
    address: '123 Rue Exemple',
    city: 'Paris',
    postal_code: '75001',
    price: 100 // Obligatoire
  }
  const mockReservations: Reservation[] = [{
    id: 100,
    lieu:mockLieu,
    start_date: '2025-08-17T10:00:00',
    end_date: '2025-08-17T12:00:00',
    nb_person: 2,
    reference: 'REF123',
    attendees: [],
    status: 'confirmed'
  }]


  beforeEach(async () => {
    httpCallServiceMock = {
      getLieuByProprietorId: jasmine.createSpy('getLieuByProprietorId').and.returnValue(of(mockLieux)),
      getReservationsByLieuId: jasmine.createSpy('getReservationsByLieuId').and.returnValue(of(mockReservations)),
      getReservationById: jasmine.createSpy('getReservationById').and.returnValue(of(mockReservations[0])),
    }

    authServiceMock = {
      getCurrentUser: jasmine.createSpy('getCurrentUser').and.returnValue(mockUser),
    }

    matDialogMock = {
      open: jasmine.createSpy('open').and.returnValue({ afterClosed: () => of(true) } as any),
    }

    await TestBed.configureTestingModule({
      imports: [
        MyReservationsComponent,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: HttpCallsService, useValue: httpCallServiceMock },
        { provide: AuthenticationService, useValue: authServiceMock },
        { provide: MatDialog, useValue: matDialogMock },
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(MyReservationsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should fetch lieux and reservations on init', fakeAsync(() => {
    component.ngOnInit()
    tick()

    expect(httpCallServiceMock.getLieuByProprietorId).toHaveBeenCalledWith(mockUser.id)
    expect(component.lieuxList).toEqual(mockLieux)

    expect(component.reservationsList.length).toBe(mockReservations.length)
    expect(component.reservationsList[0]).toEqual(mockReservations[0])
  }))


  it('should open dialog with correct reservation data', fakeAsync(() => {
    component.openDialog(100, '0ms', '0ms')
    tick()
    expect(httpCallServiceMock.getReservationById).toHaveBeenCalledWith(100)

    const config = (matDialogMock.open as jasmine.Spy).calls.mostRecent().args[1]
    expect(config.data.reservation).toEqual(mockReservations[0])
    expect(config.enterAnimationDuration).toBe('0ms')
    expect(config.exitAnimationDuration).toBe('0ms')
  }))

  it('should correctly report noReservationWithLieu', () => {
    component.reservationsList = mockReservations
    expect(component.noReservationWithLieu(10)).toBeFalse()
    expect(component.noReservationWithLieu(999)).toBeTrue()
  })
})
