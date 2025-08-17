import { ComponentFixture, TestBed } from '@angular/core/testing'
import { NavBarComponent } from './nav-bar.component'
import { MultipleTransLoaderHttp } from 'src/app/MultipleTransLoaderHttp'
import { ActivatedRoute, ParamMap, provideRouter } from '@angular/router'
import { AuthenticationService } from '../../services/authentication.service'
import { SidenavService } from '../../services/sidenav.service'
import { TranslateModule } from '@ngx-translate/core'

describe('NavBarComponent', () => {
  let component: NavBarComponent
  let fixture: ComponentFixture<NavBarComponent>
  let translateServiceMock: Partial<MultipleTransLoaderHttp>
  let authServiceMock: Partial<AuthenticationService>
  let sidenavServiceMock: Partial<SidenavService>

  beforeEach(async () => {
    translateServiceMock = {
      getLang: jasmine.createSpy('getLang').and.returnValue('fr'),
      setLang: jasmine.createSpy('setLang')
    }

    authServiceMock = {
      isAuthenticated: jasmine.createSpy('isAuthenticated').and.returnValue(true),
      isProprietor: jasmine.createSpy('isProprietor').and.returnValue(false),
      logout: jasmine.createSpy('logout')
    }

    sidenavServiceMock = {
      toggleSidenav: jasmine.createSpy('toggleSidenav'),
      hasToBeOpened: jasmine.createSpy('hasToBeOpened').and.returnValue(false)
    }

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

    await TestBed.configureTestingModule({
      imports: [NavBarComponent, TranslateModule.forRoot()],
      providers: [
        { provide: MultipleTransLoaderHttp, useValue: translateServiceMock },
        { provide: AuthenticationService, useValue: authServiceMock },
        { provide: SidenavService, useValue: sidenavServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
        provideRouter([])
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(NavBarComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should initialize currentLangDisplay from translateService', () => {
    expect(component.currentLangDisplay).toBe('fr')
  })

  it('should change language and call reload', () => {
    spyOn(component, 'reloadPage')
    component.changeLang('en')
    expect(translateServiceMock.setLang).toHaveBeenCalledWith('en')
    expect(component.reloadPage).toHaveBeenCalled()
  })

  it('should return true for isLoggedIn when authService says authenticated', () => {
    expect(component.isLoggedIn()).toBeTrue()
  })

  it('should return false for isProprietaire if user is not proprietor', () => {
    expect(component.isProprietaire()).toBeFalse()
  })

  it('should call logout on authService when logout is called', () => {
    component.logout()
    expect(authServiceMock.logout).toHaveBeenCalled()
  })

  it('should toggle sidenav', () => {
    component.toggleDrawer()
    expect(sidenavServiceMock.toggleSidenav).toHaveBeenCalled()
  })
})
