import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RegisterComponent } from './register.component'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { MultipleTransLoaderHttp } from '../../../../MultipleTransLoaderHttp'
import { AuthenticationService } from '../../../services/authentication.service'
import { AppComponent } from '../../../../app.component'
import { Constants } from '../../../Constants'
import { provideRouter, Router } from '@angular/router'
import { of, throwError } from 'rxjs'

describe('RegisterComponent', () => {
  let component: RegisterComponent
  let fixture: ComponentFixture<RegisterComponent>
  let authServiceSpy: jasmine.SpyObj<AuthenticationService>
  let translateServiceSpy: jasmine.SpyObj<MultipleTransLoaderHttp>
  let appComponentSpy: jasmine.SpyObj<AppComponent>
  let routerSpy: jasmine.SpyObj<Router>
  let constantsStub: Partial<Constants>

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthenticationService', ['register', 'setCurrentUser'])
    const translateSpy = jasmine.createSpyObj('MultipleTransLoaderHttp', ['getTranslation'])
    const appSpy = jasmine.createSpyObj('AppComponent', ['setIsLoading'])

    constantsStub = { TOKEN_KEY: 'token' }

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RegisterComponent],
      providers: [
        FormBuilder,
        { provide: AuthenticationService, useValue: authSpy },
        { provide: MultipleTransLoaderHttp, useValue: translateSpy },
        { provide: AppComponent, useValue: appSpy },
        { provide: Constants, useValue: constantsStub },
        provideRouter([])
      ]
    }).compileComponents()

    authServiceSpy = TestBed.inject(AuthenticationService) as jasmine.SpyObj<AuthenticationService>
    translateServiceSpy = TestBed.inject(MultipleTransLoaderHttp) as jasmine.SpyObj<MultipleTransLoaderHttp>
    appComponentSpy = TestBed.inject(AppComponent) as jasmine.SpyObj<AppComponent>
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>
    spyOn(routerSpy, 'navigate')
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent)
    component = fixture.componentInstance

    translateServiceSpy.getTranslation.and.returnValue(
      of({ register: { email: 'Email', password: 'Password' } })
    )

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should populate translateValues on init', () => {
    expect(component.translateValues).toEqual({ email: 'Email', password: 'Password' })
  })

  it('should validate password mismatch', () => {
    component.registerForm.setValue({
      email: 'test@test.com',
      password: '12345678',
      confirmPassword: '87654321',
      firstname: 'John',
      lastname: 'Doe',
      phone: '1234567890'
    })
    expect(component.registerForm.errors).toEqual({ passwordsMismatch: true })

    component.registerForm.patchValue({ confirmPassword: '12345678' })
    expect(component.registerForm.errors).toBeNull()
  })

  it('should determine validity of form parts', () => {
    component.registerForm.patchValue({
      firstname: 'John',
      lastname: 'Doe',
      email: 'test@test.com',
      phone: '1234567890'
    })
    expect(component.isFirstPartValid()).toBeTrue()
    expect(component.isSecondPartValid()).toBeTrue()
  })

  it('should call register and navigate on success', () => {
    const response = { token: '12345' }
    authServiceSpy.register.and.returnValue(of(response))

    component.registerForm.patchValue({
      email: 'test@test.com',
      password: '12345678',
      confirmPassword: '12345678',
      firstname: 'John',
      lastname: 'Doe',
      phone: '1234567890'
    })

    component.register()

    expect(appComponentSpy.setIsLoading).toHaveBeenCalledWith(true)
    expect(authServiceSpy.register).toHaveBeenCalledWith(component.registerForm.value)
    expect(localStorage.getItem((constantsStub.TOKEN_KEY as string))).toBe('12345')
    expect(authServiceSpy.setCurrentUser).toHaveBeenCalled()
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home'])
    expect(appComponentSpy.setIsLoading).toHaveBeenCalledWith(false)
  })

  it('should handle register error', () => {
    const error = { message: 'Invalid' }
    authServiceSpy.register.and.returnValue(throwError(() => error))

    component.registerForm.patchValue({
      email: 'test@test.com',
      password: '12345678',
      confirmPassword: '12345678',
      firstname: 'John',
      lastname: 'Doe',
      phone: '1234567890'
    })

    component.register()

    expect(appComponentSpy.setIsLoading).toHaveBeenCalledWith(true)
    expect(authServiceSpy.register).toHaveBeenCalled()
    expect(appComponentSpy.setIsLoading).toHaveBeenCalledWith(false)
  })

  it('should disable next button correctly', () => {
    component.selectedTab = 0
    component.registerForm.patchValue({ firstname: '', lastname: '' })
    expect(component.nextButtonDisabled()).toBeTrue()

    component.registerForm.patchValue({ firstname: 'John', lastname: 'Doe' })
    expect(component.nextButtonDisabled()).toBeFalse()

    component.selectedTab = 1
    component.registerForm.patchValue({ email: '', phone: '' })
    expect(component.nextButtonDisabled()).toBeTrue()

    component.registerForm.patchValue({ email: 'test@test.com', phone: '1234567890' })
    expect(component.nextButtonDisabled()).toBeFalse()

    component.selectedTab = 2
    expect(component.nextButtonDisabled()).toBeTrue()
  })
})
