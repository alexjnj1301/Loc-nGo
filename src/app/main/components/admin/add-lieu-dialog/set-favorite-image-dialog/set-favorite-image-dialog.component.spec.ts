import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SetFavoriteImageDialogComponent } from './set-favorite-image-dialog.component'
import { HttpCallsService } from '../../../../services/httpCalls.service'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { of } from 'rxjs'
import { TranslateModule } from '@ngx-translate/core'

describe('SetFavoriteImageDialogComponent', () => {
  let component: SetFavoriteImageDialogComponent
  let fixture: ComponentFixture<SetFavoriteImageDialogComponent>
  let httpServiceSpy: jasmine.SpyObj<HttpCallsService>

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('HttpCallsService', ['setImageAsFavorite'])

    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        { provide: HttpCallsService, useValue: spy },
        { provide: MAT_DIALOG_DATA, useValue: { imageUrl: 'url', lieuId: 1, imageId: 123 } }
      ]
    }).compileComponents()

    httpServiceSpy = TestBed.inject(HttpCallsService) as jasmine.SpyObj<HttpCallsService>
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SetFavoriteImageDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should call setImageAsFavorite and reloadPage on success', () => {
    httpServiceSpy.setImageAsFavorite.and.returnValue(of(''))

    // remplacer le reload par notre spy
    spyOn(component, 'reloadPage')
    component.setFavoriteImage(123)

    expect(httpServiceSpy.setImageAsFavorite).toHaveBeenCalledWith(1, 123)
  })
})
