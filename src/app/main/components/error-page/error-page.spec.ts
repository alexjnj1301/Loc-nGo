import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ErrorPageComponent } from './error-page.component'
import { ActivatedRoute } from '@angular/router'
import { MultipleTransLoaderHttp } from 'src/app/MultipleTransLoaderHttp'
import { of } from 'rxjs'
import { ErrorDetails } from '../../../enums/errorsPages'

describe('ErrorPageComponent', () => {
  let component: ErrorPageComponent
  let fixture: ComponentFixture<ErrorPageComponent>

  beforeEach(async () => {
    const routeStub = {
      snapshot: {
        paramMap: {
          get: () => 'SOME_ERROR'
        }
      }
    }

    const spy = jasmine.createSpyObj('MultipleTransLoaderHttp', ['getTranslation'])
    spy.getTranslation.and.returnValue(of({ codes_error_description: { SOME_ERROR: 'desc' } }))

    await TestBed.configureTestingModule({
      imports: [ErrorPageComponent],
      providers: [
        { provide: ActivatedRoute, useValue: routeStub },
        { provide: MultipleTransLoaderHttp, useValue: spy }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(ErrorPageComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should set code and message for known errorKey', () => {
    (ErrorDetails as any)['SOME_ERROR'] = { code: '123', message: 'Test message' }
    component.ngOnInit()
    expect(component.code).toBe('123')
    expect(component.message).toBe('Test message')
    expect(component.translateValues).toEqual({ SOME_ERROR: 'desc' })
  })

  it('should set default code and message for unknown errorKey', () => {
    (component['route'].snapshot.paramMap.get as any) = () => 'UNKNOWN_KEY'
    component.ngOnInit()
    expect(component.code).toBe('Unknown code')
    expect(component.message).toBe('Unknown error')
  })
})
