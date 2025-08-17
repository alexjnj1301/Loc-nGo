import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AppComponent } from './app.component'
import { MultipleTransLoaderHttp } from './MultipleTransLoaderHttp'
import { TranslateModule } from '@ngx-translate/core'
import { LoaderComponent } from './main/components/loader/loader.component'
import { NavBarComponent } from './main/components/nav-bar/nav-bar.component'
import { SidenavComponent } from './main/components/sidenav/sidenav.component'
import { provideHttpClient } from '@angular/common/http'
import { ActivatedRoute, ParamMap } from '@angular/router'

describe('AppComponent', () => {
  let component: AppComponent
  let fixture: ComponentFixture<AppComponent>
  let translateServiceMock: Partial<MultipleTransLoaderHttp>

  beforeEach(async () => {
    translateServiceMock = {
      getLang: jasmine.createSpy('getLang').and.returnValue('fr'),
      setLang: jasmine.createSpy('setLang')
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
      imports: [
        AppComponent,
        LoaderComponent,
        NavBarComponent,
        SidenavComponent,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: MultipleTransLoaderHttp, useValue: translateServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
        provideHttpClient()
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(AppComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should have default title', () => {
    expect(component.title).toBe('LocNgo')
  })

  it('should initialize selectedLanguage and call translation methods', () => {
    expect(component.selectedLanguage).toBe('fr')
    expect(translateServiceMock.getLang).toHaveBeenCalled()
    expect(translateServiceMock.setLang).toHaveBeenCalledWith('fr')
  })

  it('should set isLoading correctly', () => {
    component.setIsLoading(true)
    expect(component.isLoading).toBeTrue()
    component.setIsLoading(false)
    expect(component.isLoading).toBeFalse()
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })
})
