import { ComponentFixture, TestBed } from '@angular/core/testing'
import { LieuCardComponent } from './lieu-card.component'
import { MatDialog } from '@angular/material/dialog'
import { AllLieuResponse } from '../../../../models/LieuModels'
import { Constants } from '../../../Constants'
import { of } from 'rxjs'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'

describe('LieuCardComponent', () => {
  let component: LieuCardComponent
  let fixture: ComponentFixture<LieuCardComponent>
  let matDialogMock: Partial<MatDialog>

  const mockLieu: AllLieuResponse = { id: 1, name: 'Lieu 1' } as AllLieuResponse

  beforeEach(async () => {
    matDialogMock = {
      open: jasmine.createSpy('open').and.returnValue({ afterClosed: () => of(true) } as any)
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
        LieuCardComponent,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: MatDialog, useValue: matDialogMock },
        { provide: Constants, useValue: {} },
        { provide: ActivatedRoute, useValue: activatedRouteSpy }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(LieuCardComponent)
    component = fixture.componentInstance
    component.lieu = mockLieu
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should open deletion dialog with correct id', () => {
    component.openDeletionDialog(42)
    expect(matDialogMock.open).toHaveBeenCalled()
    const config = (matDialogMock.open as jasmine.Spy).calls.mostRecent().args[1]
    expect(config.data).toEqual({ id: 42 })
    expect(config.enterAnimationDuration).toBe('0ms')
    expect(config.exitAnimationDuration).toBe('0ms')
  })

  it('should open update dialog with correct id', () => {
    component.openUpdateDialog(99)
    expect(matDialogMock.open).toHaveBeenCalled()
    const config = (matDialogMock.open as jasmine.Spy).calls.mostRecent().args[1]
    expect(config.data).toEqual({ id: 99 })
    expect(config.enterAnimationDuration).toBe('0ms')
    expect(config.exitAnimationDuration).toBe('0ms')
  })
})
