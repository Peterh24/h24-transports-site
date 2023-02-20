import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosImgComponent } from './infos-img.component';

describe('InfosImgComponent', () => {
  let component: InfosImgComponent;
  let fixture: ComponentFixture<InfosImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfosImgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfosImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
