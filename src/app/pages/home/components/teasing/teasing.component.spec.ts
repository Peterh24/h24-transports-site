import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeasingComponent } from './teasing.component';

describe('TeasingComponent', () => {
  let component: TeasingComponent;
  let fixture: ComponentFixture<TeasingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeasingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeasingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
