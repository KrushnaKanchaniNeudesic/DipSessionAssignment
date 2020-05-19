import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TranslatorService {

  baseURL: string;

  constructor(private http: HttpClient) {
    this.baseURL = 'http://127.0.0.1:8086/congservice/';
  }

  getAvailableLanguage() {
    return this.http.get("https://api.cognitive.microsofttranslator.com/languages?api-version=3.0");
  }

  getTransaltedText(textToTranslate: string, targetLanguage: string) {
    return this.http.post(`${this.baseURL}translatetext/${targetLanguage}`, {text: textToTranslate})
      .pipe(response => {
        return response;
      });
  }

  TextAnalyticsTransform(textToTranslate: string) {
    return this.http.post(`${this.baseURL}textanlytics`, {text: textToTranslate})
      .pipe(response => {
        return response;
      });
  }
}
