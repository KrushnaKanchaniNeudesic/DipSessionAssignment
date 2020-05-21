import { Component } from '@angular/core';
declare global {
  interface Window {
    WebChat: any;
  }
}

window.WebChat = window.WebChat || {};
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Azure cognitive';
}
