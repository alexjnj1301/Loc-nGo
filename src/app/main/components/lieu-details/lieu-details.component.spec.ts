import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LieuDetailsComponent } from './lieu-details.component';

describe('LieuDetailsComponent', () => {
  let component: LieuDetailsComponent;
  let fixture: ComponentFixture<LieuDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LieuDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LieuDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
