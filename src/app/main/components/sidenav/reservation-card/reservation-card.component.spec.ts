import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReservationCardComponent } from './reservation-card.component'
import { TranslateModule } from '@ngx-translate/core'
import { MatCardModule } from '@angular/material/card'
import { MatChipsModule } from '@angular/material/chips'
import { NgClass } from '@angular/common'
import { Constants } from '../../../Constants'

describe('ReservationCardComponent', () => {
  let component: ReservationCardComponent
  let fixture: ComponentFixture<ReservationCardComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        MatCardModule,
        MatChipsModule,
        NgClass
      ],
      providers: [Constants]
    }).compileComponents()

    fixture = TestBed.createComponent(ReservationCardComponent)
    component = fixture.componentInstance

    // ✅ On initialise reservation avant detectChanges
    component.reservation = {
      id: 1,
      lieuImages: 'image.jpg',
      start_date: '2025-08-17',
      end_date: '2025-08-18',
      reference: 'REF123',
      lieu: { id: 1, name: 'LieuTest' } as any,
      status: 'confirmed'
    }

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should accept a reservation input', () => {
    expect(component.reservation.lieuImages).toBe('image.jpg')
    expect(component.reservation.lieu.name).toBe('LieuTest')
  })
})
