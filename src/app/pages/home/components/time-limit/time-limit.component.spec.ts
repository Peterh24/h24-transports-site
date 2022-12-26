import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeLimitComponent } from './time-limit.component';

describe('TimeLimitComponent', () => {
  let component: TimeLimitComponent;
  let fixture: ComponentFixture<TimeLimitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeLimitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeLimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
