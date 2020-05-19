import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcrTotextComponent } from './ocr-totext.component';

describe('OcrTotextComponent', () => {
  let component: OcrTotextComponent;
  let fixture: ComponentFixture<OcrTotextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcrTotextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcrTotextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
