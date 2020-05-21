import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRecognizerComponent } from './form-recognizer.component';

describe('FormRecognizerComponent', () => {
  let component: FormRecognizerComponent;
  let fixture: ComponentFixture<FormRecognizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormRecognizerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRecognizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
