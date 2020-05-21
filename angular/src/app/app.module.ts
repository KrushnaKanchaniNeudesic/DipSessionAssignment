import { FormRecognizerComponent } from './form-recognizer/form-recognizer.component';
import { FaceApiComponent } from './face-api/face-api.component';
import { LuisQnaWebChatComponent } from './luis-qna-web-chat/luis-qna-web-chat.component';
import { OcrTotextComponent } from './ocr-totext/ocr-totext.component';
import { TextanalyticsComponent } from './textanalytics/textanalytics.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { TextTranslatorComponent } from './text-translator/text-translator.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    TextTranslatorComponent,
    TextanalyticsComponent,
    OcrTotextComponent,
    LuisQnaWebChatComponent,
    FaceApiComponent,
    FormRecognizerComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    PdfViewerModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    RouterModule.forRoot([
      { path: '', component: TextTranslatorComponent, pathMatch: 'full' },
      { path: 'text-translator', component: TextTranslatorComponent },
      { path: 'text-analytics', component: TextanalyticsComponent },
      { path: 'ocr-text', component: OcrTotextComponent },
      { path: 'luis-qna-webchat', component: LuisQnaWebChatComponent },
      { path: 'face-api', component: FaceApiComponent },
      { path: 'form-recognizer', component: FormRecognizerComponent }

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
