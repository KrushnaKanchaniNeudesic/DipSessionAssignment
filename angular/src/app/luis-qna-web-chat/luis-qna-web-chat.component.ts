import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-luis-qna-web-chat',
  templateUrl: './luis-qna-web-chat.component.html',
  styleUrls: ['./luis-qna-web-chat.component.css']
})
export class LuisQnaWebChatComponent implements OnInit {

  static count = 0;
  @ViewChild("botWindow", { static: true }) botWindowElement: ElementRef;

  constructor() { }

  ngOnInit() {

    LuisQnaWebChatComponent.count++;


    const directLine = window.WebChat.createDirectLine({
      secret: "OIzc2cJQ55g.a5ODjbOUX-pEjxv9-xfmiLHZCd6_Rrk2kRBxpJpNaFg",
      webSocket: false
    });

    window.WebChat.renderWebChat(
      {
        directLine: directLine,
        userID: LuisQnaWebChatComponent.count
      },
      this.botWindowElement.nativeElement
    );

    directLine
      .postActivity({
        from: { id: LuisQnaWebChatComponent.count, name: "USER_NAME" },
        name: "requestWelcomeDialog",
        type: "event",
        value: "token"
      })
      .subscribe(
        id => console.log(`Posted activity, assigned ID ${id}`),
        error => console.log(`Error posting activity ${error}`)
      );


    // App({
    //   directLine: {secret: ''},
    //   user: {id: 'krushna'},
    //   bot: {id: LuisQnaWebChatComponent.count},
    // }, this.botWindowElement.nativeElement)
  }



}
