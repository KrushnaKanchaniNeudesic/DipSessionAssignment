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

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    TextTranslatorComponent,
    TextanalyticsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: TextTranslatorComponent, pathMatch: 'full' },
      { path: 'text-translator', component: TextTranslatorComponent },
      { path: 'text-analytics', component: TextanalyticsComponent },

      
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
