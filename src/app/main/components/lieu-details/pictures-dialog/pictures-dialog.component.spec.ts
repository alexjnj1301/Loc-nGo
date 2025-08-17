import { ComponentFixture, TestBed } from '@angular/core/testing'
import { PicturesDialogComponent } from './pictures-dialog.component'
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog'
import { TranslateModule } from '@ngx-translate/core'
import { ImageDialogData, LieuDetailsImages } from '../../../../models/LieuModels'

describe('PicturesDialogComponent', () => {
  let component: PicturesDialogComponent
  let fixture: ComponentFixture<PicturesDialogComponent>

  const mockImages: LieuDetailsImages[] = [
    { id: 1, imageUrl: 'img1.jpg' },
    { id: 2, imageUrl: 'img2.jpg' }
  ]

  const mockData: ImageDialogData = {
    images: mockImages,
    index: 0,
    url: 'img1.jpg'
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, TranslateModule.forRoot(), PicturesDialogComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockData }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(PicturesDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should initialize images and imgUrl correctly', () => {
    expect(component.images).toEqual(mockData)
    expect(component.imgUrl).toBe('img1.jpg')
  })

  it('should return correct image by id', () => {
    expect(component.getImageToDisplayViaId(1)).toBe('img1.jpg')
    expect(component.getImageToDisplayViaId(2)).toBe('img2.jpg')
    expect(component.getImageToDisplayViaId(999)).toBeUndefined()
  })

  it('should return correct image by url', () => {
    expect(component.getImageToDisplayViaUrl('img1.jpg')).toBe('img1.jpg')
    expect(component.getImageToDisplayViaUrl('img2.jpg')).toBe('img2.jpg')
    expect(component.getImageToDisplayViaUrl('notfound.jpg')).toBeUndefined()
  })

  it('should change imgUrl when changeImage is called with valid id', () => {
    component.changeImage(2)
    expect(component.imgUrl).toBe('img2.jpg')
  })
})
