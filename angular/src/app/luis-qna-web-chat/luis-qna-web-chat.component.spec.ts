import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LuisQnaWebChatComponent } from './luis-qna-web-chat.component';

describe('LuisQnaWebChatComponent', () => {
  let component: LuisQnaWebChatComponent;
  let fixture: ComponentFixture<LuisQnaWebChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LuisQnaWebChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LuisQnaWebChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
