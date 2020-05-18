import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LangtranslateComponent } from './langtranslate.component';

describe('LangtranslateComponent', () => {
  let component: LangtranslateComponent;
  let fixture: ComponentFixture<LangtranslateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LangtranslateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LangtranslateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
