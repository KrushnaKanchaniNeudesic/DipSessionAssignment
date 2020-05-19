import { Component, OnInit } from '@angular/core';
import { TranslatorService } from '../services/translator.service';
import { AvailableLanguage } from '../models/availablelanguage';
import { TranslationResult } from '../models/translationresult';

@Component({
  selector: 'app-text-translator',
  templateUrl: './text-translator.component.html',
  styleUrls: ['./text-translator.component.css']
})
export class TextTranslatorComponent implements OnInit {

  loading = false;
  availbleLanguage: AvailableLanguage[];
  outputLanguage: string;
  inputText: string;
  translationResult: TranslationResult;

  constructor(private translatorService: TranslatorService) { }

  ngOnInit() {
    this.translatorService.getAvailableLanguage().subscribe(
      (result: any) => {
        let avLang: AvailableLanguage[] = [];
        for (let key of Object.keys(result.dictionary)) {
          let asdasd = result.dictionary[key].name;
          avLang.push({languageID:key, languageName: asdasd});
        }
        this.availbleLanguage = avLang;
      }
    );
  }

  GetTranslation() {
    if (this.outputLanguage != null) {
      this.loading = true;
      this.translatorService.getTransaltedText(this.inputText, this.outputLanguage).subscribe
        ((result: any) => {
          debugger
          this.translationResult = result[0].translations[0].text;
          this.loading = false;
        });
    }
  }

  setTargetlanguage(selectedItem) {
    this.outputLanguage = selectedItem.target.value;
  }
}
