import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextanalyticsComponent } from './textanalytics.component';

describe('TextanalyticsComponent', () => {
  let component: TextanalyticsComponent;
  let fixture: ComponentFixture<TextanalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextanalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextanalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
