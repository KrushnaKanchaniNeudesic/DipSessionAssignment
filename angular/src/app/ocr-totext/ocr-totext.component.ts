import { Component, OnInit } from '@angular/core';
import { TranslatorService } from '../services/translator.service';

@Component({
  selector: 'app-ocr-totext',
  templateUrl: './ocr-totext.component.html',
  styleUrls: ['./ocr-totext.component.css']
})
export class OcrTotextComponent implements OnInit {
  loading = false;
  fileurl: string = null;
  convertedText = '';
  constructor(private translatorService: TranslatorService) { }

  ngOnInit() {
  }

  uploadFileToActivity() {
    this.loading = true;
    this.translatorService.OcrImageUpload(this.fileurl).subscribe(
      (data: { regions: [{ lines: [{ words: [{ text: string }] }] }] }) => {
        this.loading = false;
        this.convertedText = '';
        if (data.regions) {
          data.regions.forEach(reg => {
            reg.lines.forEach(lin => {
              lin.words.forEach(wrd => {
                this.convertedText = this.convertedText + ' ' + wrd.text;
              });

            });
            this.convertedText =  this.convertedText + '<br>';
          });
        }

      }, error => {
        this.loading = false;

        console.log(error);
      });
  }

}
