import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLieuxComponent } from './my-lieux.component';

describe('MyLieuxComponent', () => {
  let component: MyLieuxComponent;
  let fixture: ComponentFixture<MyLieuxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyLieuxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyLieuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
