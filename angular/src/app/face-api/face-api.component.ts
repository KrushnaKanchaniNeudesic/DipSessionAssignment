import { Component, OnInit } from '@angular/core';
import { TranslatorService } from '../services/translator.service';

@Component({
  selector: 'app-face-api',
  templateUrl: './face-api.component.html',
  styleUrls: ['./face-api.component.css']
})
export class FaceApiComponent implements OnInit {

  loading = false;
  fileurl: string = null;
  faceApiResultText;
  faceMatched = false;
  resultText;
  peronGroupId: string;
  personName: string;
  personUrl: string;
  showPersonGroupIdResult = false;
  personGroupIdResultText:string;
  matchPeronGroupId: string;
  constructor(private translatorService: TranslatorService) { }

  ngOnInit() {
  }

  MatchFaceClick() {
    this.faceMatched = false;
    this.loading = true;
    this.translatorService.MatchFaceApi(this.matchPeronGroupId, this.fileurl).subscribe((x: []) => {
      this.loading = false;
      this.faceApiResultText = JSON.stringify(x, null, 2);
      if (x && x.length > 0) {
        x.forEach((element: { candidates: [{ confidence: number }] }) => {
          if (element && element.candidates && element.candidates.length > 0) {
            let filterData = element.candidates.filter(x => x.confidence > 0.8);
            if (filterData && filterData.length > 0) {
              this.faceMatched = true;
              this.resultText = "Image matched with Person group";
              return;

            } else {
              this.resultText = "face not recognised";

            }
          }
        });

      }
    }, err => {
      this.loading = false;
    })
  }

  CreatePersonGroup(){
    this.translatorService.CreatePersonGroup(this.peronGroupId).subscribe(x=>{
      this.personGroupIdResultText = "Person Group Id created Successfully";
    },err=>{
      console.log(err);
      this.personGroupIdResultText = "Person Group Id creation faild";
    })
  }

  AddPerosn(){
    this.loading = true;
     this.personGroupIdResultText = '';
    this.translatorService.AddPerosnIntoPersonGroup (this.peronGroupId, this.personName, this. personUrl).subscribe(x=>{
      this.loading = false;
      this.personGroupIdResultText = "Person created Successfully";
    },err=>{
      console.log(err);
      this.loading = false;

      this.personGroupIdResultText = "Person creation faild";
    })
  }

}
