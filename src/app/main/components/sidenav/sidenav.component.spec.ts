import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SidenavComponent } from './sidenav.component'
import { SidenavService } from '../../services/sidenav.service'
import { AuthenticationService } from '../../services/authentication.service'
import { HttpCallsService } from '../../services/httpCalls.service'
import { of, Subject } from 'rxjs'
import { MatDrawer } from '@angular/material/sidenav'
import { CurrentUser } from '../../../models/CurrentUser'
import { AllReservationsByUserId } from '../../../models/ReservationPerUser'
import { TranslateModule } from '@ngx-translate/core'

describe('SidenavComponent', () => {
  let component: SidenavComponent
  let fixture: ComponentFixture<SidenavComponent>
  let sidenavServiceMock: Partial<SidenavService>
  let authServiceMock: Partial<AuthenticationService>
  let httpCallsServiceMock: Partial<HttpCallsService>

  let toggleSidenavSubject: Subject<void>
  let authChangeSubject: Subject<CurrentUser | null>

  beforeEach(async () => {
    toggleSidenavSubject = new Subject<void>()
    authChangeSubject = new Subject<CurrentUser | null>()

    sidenavServiceMock = {
      toggleSidenav$: toggleSidenavSubject.asObservable(),
      toggleSidenav: jasmine.createSpy('toggleSidenav'),
      hasToBeOpened: jasmine.createSpy('hasToBeOpened').and.returnValue(false)
    }

    const user: CurrentUser = {
      id: 42,
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@test.com',
      roles: ['USER']
    } as CurrentUser

    authServiceMock = {
      isAuthenticated: jasmine.createSpy('isAuthenticated').and.returnValue(true),
      onAuthChange: jasmine.createSpy('onAuthChange').and.returnValue(authChangeSubject.asObservable()),
      getCurrentUser: jasmine.createSpy('getCurrentUser').and.returnValue(user),
      logout: jasmine.createSpy('logout')
    }

    httpCallsServiceMock = {
      getAllReservationsByUserId: jasmine.createSpy('getAllReservationsByUserId').and.returnValue(of([]))
    }

    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        SidenavComponent
      ],
      providers: [
        { provide: SidenavService, useValue: sidenavServiceMock },
        { provide: AuthenticationService, useValue: authServiceMock },
        { provide: HttpCallsService, useValue: httpCallsServiceMock }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(SidenavComponent)
    component = fixture.componentInstance

    component.drawer = jasmine.createSpyObj('MatDrawer', ['toggle']) as MatDrawer

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should toggle drawer when toggleSideNav is called', () => {
    // transformer toggle en spy
    component.drawer.toggle = jasmine.createSpy('toggle')

    component.toggleSideNav()
    expect(component.drawer.toggle).toHaveBeenCalled()
  })

  it('should call authService.isAuthenticated in isLoggedIn', () => {
    expect(component.isLoggedIn()).toBeTrue()
    expect(authServiceMock.isAuthenticated).toHaveBeenCalled()
  })

  it('should call authService.logout in logout', () => {
    component.logout()
    expect(authServiceMock.logout).toHaveBeenCalled()
  })

  it('should fetch reservations on ngOnInit if authenticated', () => {
    expect(httpCallsServiceMock.getAllReservationsByUserId).toHaveBeenCalledWith(42)
  })

  it('should clear reservations if user is null on authChange', () => {
    component.reservations = [{ id: 1 }] as AllReservationsByUserId[]
    authChangeSubject.next(null)
    fixture.detectChanges()

    expect(component.currentUser).toBeNull()
    expect(component.reservations).toEqual([])
  })

  it('should unsubscribe from authSubscription on ngOnDestroy', () => {
    spyOn(component['authSubscription'], 'unsubscribe')
    component.ngOnDestroy()
    expect(component['authSubscription'].unsubscribe).toHaveBeenCalled()
  })

  it('should react to sidenavService toggleSidenav$ observable', () => {
    component.drawer.toggle = jasmine.createSpy('toggle')

    toggleSidenavSubject.next()
    expect(component.drawer.toggle).toHaveBeenCalled()
  })
})
