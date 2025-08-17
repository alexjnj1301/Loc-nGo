import { ComponentFixture, TestBed } from '@angular/core/testing'
import { LoginComponent } from './login.component'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { MultipleTransLoaderHttp } from '../../../../MultipleTransLoaderHttp'
import { AuthenticationService } from '../../../services/authentication.service'
import { AppComponent } from '../../../../app.component'
import { Constants } from '../../../Constants'
import { provideRouter, Router } from '@angular/router'
import { of, throwError } from 'rxjs'

describe('LoginComponent', () => {
  let component: LoginComponent
  let fixture: ComponentFixture<LoginComponent>
  let authServiceSpy: jasmine.SpyObj<AuthenticationService>
  let translateServiceSpy: jasmine.SpyObj<MultipleTransLoaderHttp>
  let appComponentSpy: jasmine.SpyObj<AppComponent>
  let routerSpy: jasmine.SpyObj<Router>
  let constantsStub: Partial<Constants>

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthenticationService', ['login', 'setCurrentUser'])
    const translateSpy = jasmine.createSpyObj('MultipleTransLoaderHttp', ['getTranslation'])
    const appSpy = jasmine.createSpyObj('AppComponent', ['setIsLoading'])

    constantsStub = {
      TOKEN_KEY: 'token'
    }

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        LoginComponent
      ],
      providers: [
        FormBuilder,
        { provide: AuthenticationService, useValue: authSpy },
        { provide: MultipleTransLoaderHttp, useValue: translateSpy },
        { provide: AppComponent, useValue: appSpy },
        { provide: Constants, useValue: constantsStub },
        provideRouter([])
      ]
    }).compileComponents();

    authServiceSpy = TestBed.inject(AuthenticationService) as jasmine.SpyObj<AuthenticationService>
    translateServiceSpy = TestBed.inject(MultipleTransLoaderHttp) as jasmine.SpyObj<MultipleTransLoaderHttp>
    appComponentSpy = TestBed.inject(AppComponent) as jasmine.SpyObj<AppComponent>
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>
    spyOn(routerSpy, 'navigate')
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent)
    component = fixture.componentInstance

    translateServiceSpy.getTranslation.and.returnValue(of({ login: { email: 'Email', password: 'Password' } }))

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should populate translateValues on init', () => {
    expect(component.translateValues).toEqual({ email: 'Email', password: 'Password' })
  })

  it('should call login and navigate on success', () => {
    const response = { token: '12345' }
    authServiceSpy.login.and.returnValue(of(response))

    component.loginForm.setValue({ email: 'test@test.com', password: '123456' })
    component.login()

    expect(appComponentSpy.setIsLoading).toHaveBeenCalledWith(true)
    expect(authServiceSpy.login).toHaveBeenCalledWith({ email: 'test@test.com', password: '123456' })
    expect(localStorage.getItem((constantsStub.TOKEN_KEY as string))).toBe('12345')
    expect(authServiceSpy.setCurrentUser).toHaveBeenCalled()
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home'])
    expect(appComponentSpy.setIsLoading).toHaveBeenCalledWith(false)
  })

  it('should handle login error', () => {
    const error = { message: 'Invalid' }
    authServiceSpy.login.and.returnValue(throwError(() => error))

    component.loginForm.setValue({ email: 'test@test.com', password: '123456' })
    component.login()

    expect(appComponentSpy.setIsLoading).toHaveBeenCalledWith(true)
    expect(authServiceSpy.login).toHaveBeenCalled()
    expect(appComponentSpy.setIsLoading).toHaveBeenCalledWith(false)
  })
})
