import { Component } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MyLieuxComponent } from './my-lieux.component'
import { HttpCallsService } from '../../services/httpCalls.service'
import { AuthenticationService } from '../../services/authentication.service'
import { MatDialog } from '@angular/material/dialog'
import { of, throwError } from 'rxjs'
import { AllLieuResponse } from '../../../models/LieuModels'
import { TranslateModule } from '@ngx-translate/core'
import { CurrentUser } from '../../../models/CurrentUser'
import { ActivatedRoute, ParamMap } from '@angular/router'

@Component({selector: 'app-add-lieu-dialog', template: ''})
class AddLieuDialogStubComponent {}

describe('MyLieuxComponent', () => {
  let component: MyLieuxComponent
  let fixture: ComponentFixture<MyLieuxComponent>
  let httpCallServiceMock: jasmine.SpyObj<HttpCallsService>
  let authServiceMock: jasmine.SpyObj<AuthenticationService>
  let matDialogMock: jasmine.SpyObj<MatDialog>

  const mockUser: CurrentUser = {
    id: 1,
    firstname: 'John',
    lastname: 'Doe',
    email: 'john@doe.com',
    roles: ['USER']
  }

  const mockLieux: AllLieuResponse[] = [
    { id: 1, name: 'Lieu 1' } as AllLieuResponse,
    { id: 2, name: 'Lieu 2' } as AllLieuResponse
  ]

  beforeEach(async () => {
    httpCallServiceMock = jasmine.createSpyObj('HttpCallsService', ['getLieuByProprietorId'])
    httpCallServiceMock.getLieuByProprietorId.and.returnValue(of(mockLieux))

    authServiceMock = jasmine.createSpyObj('AuthenticationService', ['getCurrentUser'])
    authServiceMock.getCurrentUser.and.returnValue(mockUser)

    matDialogMock = jasmine.createSpyObj('MatDialog', ['open'])
    matDialogMock.open.and.returnValue({
      afterClosed: () => of(true)
    } as any)

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
        MyLieuxComponent,
        TranslateModule.forRoot(),
        AddLieuDialogStubComponent
      ],
      providers: [
        { provide: HttpCallsService, useValue: httpCallServiceMock },
        { provide: AuthenticationService, useValue: authServiceMock },
        { provide: MatDialog, useValue: matDialogMock },
        { provide: ActivatedRoute, useValue: activatedRouteSpy }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(MyLieuxComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should fetch myLieux on ngOnInit', () => {
    component.ngOnInit()
    expect(authServiceMock.getCurrentUser).toHaveBeenCalled()
    expect(httpCallServiceMock.getLieuByProprietorId).toHaveBeenCalledWith(mockUser.id)
    expect(component.myLieux).toEqual(mockLieux)
  })

  it('should handle error when fetching myLieux fails', () => {
    httpCallServiceMock.getLieuByProprietorId.and.returnValue(throwError(() => new Error('fail')))
    spyOn(console, 'error')
    component.getMyLieux()
    expect(console.error).toHaveBeenCalledWith('Error fetching my lieux:', jasmine.any(Error))
  })
})
