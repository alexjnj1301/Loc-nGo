import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ValidDeletionDialogComponent } from './valid-deletion-dialog.component'
import { HttpCallsService } from 'src/app/main/services/httpCalls.service'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { of, throwError } from 'rxjs'
import { TranslateModule } from '@ngx-translate/core'

describe('ValidDeletionDialogComponent', () => {
  let component: ValidDeletionDialogComponent
  let fixture: ComponentFixture<ValidDeletionDialogComponent>
  let httpServiceSpy: jasmine.SpyObj<HttpCallsService>

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('HttpCallsService', ['deleteLieuById'])

    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        { provide: HttpCallsService, useValue: spy },
        { provide: MAT_DIALOG_DATA, useValue: { id: 42 } }
      ]
    }).compileComponents()

    httpServiceSpy = TestBed.inject(HttpCallsService) as jasmine.SpyObj<HttpCallsService>
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidDeletionDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should call deleteLieuById and reloadPage on success', () => {
    httpServiceSpy.deleteLieuById.and.returnValue(of(''))

    spyOn(component, 'reloadPage')
    component.delete()

    expect(httpServiceSpy.deleteLieuById).toHaveBeenCalledWith(42)
    expect(component.reloadPage).toHaveBeenCalled()
  })

  it('should log an error on delete failure', () => {
    const error = { message: 'Erreur serveur' }
    httpServiceSpy.deleteLieuById.and.returnValue(throwError(() => error))

    spyOn(console, 'error')
    component.delete()

    expect(console.error).toHaveBeenCalledWith('Error deleting lieu:', error)
  })
})
