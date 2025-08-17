import { ComponentFixture, TestBed } from '@angular/core/testing'
import { HomePageComponent } from './home-page.component'
import { HttpCallsService } from '../../services/httpCalls.service'
import { of, throwError } from 'rxjs'
import { AllLieuResponse } from '../../../models/LieuModels'
import { TranslateService } from '@ngx-translate/core'

describe('HomePageComponent', () => {
  let component: HomePageComponent
  let fixture: ComponentFixture<HomePageComponent>
  let httpSpy: jasmine.SpyObj<HttpCallsService>

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('HttpCallsService', ['getAllLieu'])
    const translateSpy = jasmine.createSpyObj('TranslateService', ['get', 'instant'])
    translateSpy.get.and.returnValue(of({}))

    await TestBed.configureTestingModule({
      imports: [HomePageComponent],
      providers: [
        { provide: HttpCallsService, useValue: spy },
        { provide: TranslateService, useValue: translateSpy }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(HomePageComponent)
    component = fixture.componentInstance
    httpSpy = TestBed.inject(HttpCallsService) as jasmine.SpyObj<HttpCallsService>
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should populate listLieux on success', () => {
    const mockData: AllLieuResponse[] = [
      { id: 1, name: 'Lieu 1' } as AllLieuResponse,
      { id: 2, name: 'Lieu 2' } as AllLieuResponse
    ]
    httpSpy.getAllLieu.and.returnValue(of(mockData))

    component.ngOnInit()

    expect(httpSpy.getAllLieu).toHaveBeenCalled()
    expect(component.listLieux).toEqual(mockData)
  })

  it('should handle error on getAllLieu', () => {
    const consoleSpy = spyOn(console, 'error')
    httpSpy.getAllLieu.and.returnValue(throwError(() => new Error('Test error')))

    component.ngOnInit()

    expect(httpSpy.getAllLieu).toHaveBeenCalled()
    expect(consoleSpy).toHaveBeenCalledWith(jasmine.any(Error))
  })
})
