import { Component, OnInit } from '@angular/core';
import { TranslatorService } from '../services/translator.service';

@Component({
  selector: 'app-form-recognizer',
  templateUrl: './form-recognizer.component.html',
  styleUrls: ['./form-recognizer.component.css']
})
export class FormRecognizerComponent implements OnInit {

  faceApiResultText: string;
  fileurl: string;
  loadingAnlyzeFrom = false;
  locatedUrl: string;
  loadingGetResult = false;
  constructor(private translatorService: TranslatorService) { }

  ngOnInit() {
  }
  AnalyzeForm() {

    this.loadingAnlyzeFrom = true;
    this.translatorService.AnalyzeFrom(this.fileurl).subscribe((x: { loctedurl: string }) => {
      this.loadingAnlyzeFrom = false;
      this.locatedUrl = x.loctedurl;
    }, err => {
      this.loadingAnlyzeFrom = false;
      debugger;
    })

  }

  GetFormAnlyzeText() {
    this.loadingGetResult = true;
    this.translatorService.AnalyzeFromGetresult(this.locatedUrl).subscribe((y: any) => {
      this.loadingGetResult = false;
      if (y && y.analyzeResult && y.analyzeResult.documentResults) {
        let result = y.analyzeResult.documentResults.map(x => x.fields);
        let formtedArray ={
          Invoicedate : result[0].Invoicedate.text,
          Total: result[0].total.text,
          To: result[0].to.text
        };
       
        this.faceApiResultText = JSON.stringify(formtedArray, null, 2);

      }

      debugger;
    }, err => {
      this.loadingGetResult = false;

    });
  }

}
