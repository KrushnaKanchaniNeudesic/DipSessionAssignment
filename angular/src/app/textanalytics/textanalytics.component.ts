import { Component, OnInit } from '@angular/core';
import { TranslatorService } from '../services/translator.service';

@Component({
  selector: 'app-textanalytics',
  templateUrl: './textanalytics.component.html',
  styleUrls: ['./textanalytics.component.css']
})
export class TextanalyticsComponent implements OnInit {

  loading = false;
  inputText: string;
  textAnalyticsResponse= {
    detectedlanguge: undefined,
    sentiments: undefined,
    entities: undefined,
    keyparse: undefined
  };

  actualTextAnalyticsResult ={
    detectedlanguge: undefined,
    sentiments: undefined,
    entities: undefined,
    keyparse: undefined
  }


  constructor(private translatorService: TranslatorService) { }


  ngOnInit() {
  }

  GetTranslation() {
    if (this.inputText) {
      this.loading = true;
      this.translatorService.TextAnalyticsTransform(this.inputText).subscribe
        ((result: any) => {
          this.actualTextAnalyticsResult = result;
          this.textAnalyticsResponse.detectedlanguge = JSON.stringify(result.detectedlanguge,null, 2);
          this.textAnalyticsResponse.entities = JSON.stringify(result.entities,null, 2);
          this.textAnalyticsResponse.keyparse = JSON.stringify(result.keyparse,null, 2);
          this.textAnalyticsResponse.sentiments = JSON.stringify(result.sentiments,null, 2);

          this.loading = false;
        });
    }
  }

}
