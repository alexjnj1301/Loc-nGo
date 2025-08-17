import { ComponentFixture, TestBed } from '@angular/core/testing'
import { LieuDetailsComponent } from './lieu-details.component'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { AppComponent } from '../../../app.component'
import { HttpCallsService } from '../../services/httpCalls.service'
import { Constants } from '../../Constants'
import { AuthenticationService } from '../../services/authentication.service'
import { SidenavComponent } from '../sidenav/sidenav.component'
import { MatDialog } from '@angular/material/dialog'
import { DatePipe } from '@angular/common'
import { FormBuilder } from '@angular/forms'
import { of, throwError } from 'rxjs'
import { LieuDetailsResponse } from '../../../models/LieuModels'
import { TranslateModule } from '@ngx-translate/core'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'


describe('LieuDetailsComponent', () => {
  let component: LieuDetailsComponent
  let fixture: ComponentFixture<LieuDetailsComponent>
  let httpCallsServiceSpy: jasmine.SpyObj<HttpCallsService>
  let dialogSpy: jasmine.SpyObj<MatDialog>
  let appComponentStub: Partial<AppComponent>

  beforeEach(async () => {
    httpCallsServiceSpy = jasmine.createSpyObj('HttpCallsService', ['getLieuById', 'postBookRequest'])
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open'])
    appComponentStub = { setIsLoading: jasmine.createSpy(), isLoading: false }
    const authSpy = jasmine.createSpyObj('AuthenticationService', ['login', 'setCurrentUser', 'isAuthenticated'])
    authSpy.isAuthenticated.and.returnValue(true)

    const paramMapSpy: ParamMap = {
      get: () => '1',
      getAll: () => ['1'],
      has: () => true,
      keys: ['id']
    }

    const activatedRouteSpy = {
      snapshot: {
        paramMap: paramMapSpy
      }
    }

    const mockLieuDetails: LieuDetailsResponse = {
      id: 1,
      name: 'Lieu Test',
      address: '123 Rue Exemple',
      city: 'Paris',
      postal_code: '75000',
      favorite_picture: 'fav.jpg',
      description: 'Description du lieu',
      price: 100,
      images: [
        { imageUrl: 'img1.jpg' } as any,
        { imageUrl: 'img2.jpg' } as any
      ],
      services: [],
      reservations: []
    }

    httpCallsServiceSpy.getLieuById.and.returnValue(of(mockLieuDetails))

    await TestBed.configureTestingModule({
      imports: [
        LieuDetailsComponent,
        TranslateModule.forRoot(),
        MatDatepickerModule,
        MatNativeDateModule
      ],
      providers: [
        { provide: HttpCallsService, useValue: httpCallsServiceSpy },
        { provide: MatDialog, useValue: dialogSpy },
        { provide: AppComponent, useValue: appComponentStub },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
        { provide: DatePipe, useClass: DatePipe },
        { provide: Constants, useValue: {} },
        { provide: AuthenticationService, useValue: authSpy },
        { provide: SidenavComponent, useValue: { getReservations: jasmine.createSpy() } },
        FormBuilder
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(LieuDetailsComponent)
    component = fixture.componentInstance
    component.bookForm.get('startDate')?.setValue(new Date());
    component.bookForm.get('endDate')?.setValue(new Date());
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should initialize isImageLoaded as false', () => {
    component.ngOnInit()
    expect(component.isImageLoaded).toBeFalse()
  })

  it('should set isImageLoaded to true on image load', () => {
    component.onImageLoad()
    expect(component.isImageLoaded).toBeTrue()
  })

  it('should add and remove attendees', () => {
    const initialLength = component.attendeesFormArray.length
    component.addAttendee()
    expect(component.attendeesFormArray.length).toBe(initialLength + 1)

    component.removeAttendee(0)
    expect(component.attendeesFormArray.length).toBeGreaterThan(0)
  })

  it('should calculate number of days correctly', () => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)

    component.bookForm.get('startDate')?.setValue(today)
    component.bookForm.get('endDate')?.setValue(tomorrow)

    expect(component.calculateNumberOfDays()).toBe(1)
  })

  it('should call dialog.open when openDialog is called with valid tile', () => {
    component.lieuDetails = { images: [{ imageUrl: 'img1.jpg' }, { imageUrl: 'img2.jpg' }], favorite_picture: 'fav.jpg' } as any
    const tile = { img: 'img1.jpg', position: 0 } as any

    component.openDialog(tile)
    expect(dialogSpy.open).toHaveBeenCalled()
  })

  it('should handle getLieuDetails observable', (done) => {
    component.getLieuDetails().subscribe({
      next: (res) => {
        expect(res).toBeTruthy()
        done()
      },
      error: () => {
        fail('Observable should not error')
        done()
      }
    })
  })

  it('should handle error in getLieuDetails observable', (done) => {
    httpCallsServiceSpy.getLieuById.and.returnValue(throwError(() => new Error('test error')))

    component.getLieuDetails().subscribe({
      next: () => {
        fail('Observable should not succeed')
        done()
      },
      error: (err) => {
        expect(err).toBeTruthy()
        done()
      }
    })
  })
})
