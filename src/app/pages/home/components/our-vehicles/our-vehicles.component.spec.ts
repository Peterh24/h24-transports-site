import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurVehiclesComponent } from './our-vehicles.component';

describe('OurVehiclesComponent', () => {
  let component: OurVehiclesComponent;
  let fixture: ComponentFixture<OurVehiclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OurVehiclesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
