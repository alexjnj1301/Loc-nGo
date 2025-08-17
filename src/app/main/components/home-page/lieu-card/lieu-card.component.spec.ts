import { ComponentFixture, TestBed } from '@angular/core/testing'
import { LieuCardComponent } from './lieu-card.component'
import { Router } from '@angular/router'
import { Constants } from '../../../Constants'
import { TranslateModule } from '@ngx-translate/core'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatIconModule } from '@angular/material/icon'

describe('LieuCardComponent', () => {
  let component: LieuCardComponent
  let fixture: ComponentFixture<LieuCardComponent>
  let routerSpy: jasmine.SpyObj<Router>
  let constantsStub: Partial<Constants>

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate'])
    constantsStub = {}

    await TestBed.configureTestingModule({
      imports: [
        LieuCardComponent,
        TranslateModule.forRoot(),
        MatProgressSpinnerModule,
        MatIconModule
      ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: Constants, useValue: constantsStub }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(LieuCardComponent)
    component = fixture.componentInstance

    component.lieu = { id: 123 } as any

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

  it('should navigate to lieu-details on redirect', () => {
    component.redirect()
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/lieu-details', 123])
  })
})
