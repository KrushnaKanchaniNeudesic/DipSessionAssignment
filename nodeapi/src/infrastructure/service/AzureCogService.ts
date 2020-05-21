import { CustomeException } from './../config/custome-excetion';
import { AxiosApi } from '../external-api/axios-api';
import { injectable, inject } from "inversify";
import TYPES from "../../domain/constant/types";
import { IAzureCogService } from '../../interfaces_adapters/services/IAzureCogService';


@injectable()
export class AzureCogService implements IAzureCogService {

  private readonly _axiosApi: AxiosApi;
  private readonly textTransalteBaseUrl = "https://eastus.api.cognitive.microsoft.com/text/analytics/v3.0-preview.1/";
  private readonly textTranslateHeaders = {
    "Ocp-Apim-Subscription-Key": "1460c465c35347f3a51315ebf815a2dd",
    "Content-Type": "application/json"
  }

  public constructor(
    @inject(TYPES.AxisApi) axiosApi: AxiosApi

  ) {
    this._axiosApi = axiosApi;
  }


  TranlateText(langId: any, text: string) {

    let data = [{ "Text": text }];

    return this._axiosApi.post(`https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=${langId}`, JSON.stringify(data), {
      headers: {
        "Ocp-Apim-Subscription-Key": "367e09bef0fd42a5b17ad34af58c6bf3",
        "Ocp-Apim-Subscription-Region": "centralindia",
        "Content-Type": "application/json"
      }
    }).then(res => {
      return res.data;
    }).catch(err => {
      console.log(err);
    })
  }

  async Textanlytics(text: string) {
    let response = {
      detectedlanguge: undefined,
      sentiments: undefined,
      entities: undefined,
      keyparse: undefined
    };

    let res = await Promise.all(
      [this.CallTranslateTextApi(text, 'languages'),
      this.CallTranslateTextApi(text, 'sentiment'),
      this.CallTranslateTextApi(text, 'entities/recognition/general'),
      this.CallTranslateTextApi(text, 'keyPhrases')]);
    response.detectedlanguge = res[0];
    response.sentiments = res[1];
    response.entities = res[2];
    response.keyparse = res[3];
    return response;
  }


  async ReadOcrImage(imagurl) {

    let data = JSON.stringify({ url: imagurl });
    return this._axiosApi.post(`https://eastus.api.cognitive.microsoft.com/vision/v2.0/ocr?language=unk&detectOrientation=true`, data, {
      headers: {
        "Ocp-Apim-Subscription-Key": "d8173c9f636141ef96169511244c79bd",
        "Content-Type": "application/json"
      }
    }).then(res => {
      return res.data;
    }).catch(err => {
      console.log(err);
    })
  }

  async MatchFace(persongroupId: string, url: string) {
    let detectFaceApiResponce: any = await this.detectFace(url);

    if (detectFaceApiResponce && detectFaceApiResponce.length > 0) {
      let facesIds = detectFaceApiResponce.map(a => a.faceId);

      let reqDataIdentify = {
        "personGroupId": persongroupId,
        "faceIds": facesIds,
        "maxNumOfCandidatesReturned": 1,
        "confidenceThreshold": 0.5
      };

      return this._axiosApi.post(`https://eastus.api.cognitive.microsoft.com/face/v1.0/identify`, JSON.stringify(reqDataIdentify), {
        headers: {
          "Ocp-Apim-Subscription-Key": "607670eec0d746bdb0607a1db29fe6ce",
          "Content-Type": "application/json"
        }
      }).then(res => {
        return res.data;
      }).catch(err => {
        console.log(err);
      })
    }
  }

  async CreatePersonGroup(personGroupId: string) {

    let data = JSON.stringify({
      "name": personGroupId,
      "userData": personGroupId,
      "recognitionModel": "recognition_02"
    });
    return this._axiosApi.put(`https://eastus.api.cognitive.microsoft.com/face/v1.0/persongroups/${personGroupId}`, data, {
      headers: {
        "Ocp-Apim-Subscription-Key": "607670eec0d746bdb0607a1db29fe6ce",
        "Content-Type": "application/json"
      }
    }).then(res => {
      return res.data;
    }).catch(err => {
     return {error: err}
    })
  }

  async AddPersonIntoPersonGroup(personGroupId: string, perosnName: string, url: string) {

    const result: any = await this.CreatePersonGroup(personGroupId);
    if (result && result.error) {
      throw new CustomeException("Group creation failed", 500);

    }
    let personFaceApiResult: any = await this.CreatePerosnNamePersonGroup(personGroupId, perosnName);
    if (personFaceApiResult && personFaceApiResult.personId) {
      let resAddFaceToPerson = await  this.AddFaceToPerson(personGroupId, personFaceApiResult.personId, url);
      if(resAddFaceToPerson){
        return this.TrainPeronsGroup(personGroupId);
      }
    }

  }

  async AnalyzeForm(url: string){
    
    let data = JSON.stringify({
      source:url
    });
    return this._axiosApi.post(`https://westus.api.cognitive.microsoft.com/formrecognizer/v2.0-preview/custom/models/4553f113-010b-4af7-b2a6-03bd891f52c6/analyze`, data, {
      headers: {
        "Ocp-Apim-Subscription-Key": "70602e8ff99f4ebb8aae2781c417fcc5",
        "Content-Type": "application/json"
      }
    }).then(res => {
      return {loctedurl:  res.headers['operation-location']};
    }).catch(err => {
     return {error: err}
    })
  }

  async AnalyzeFormGetResult(url: string){
    return this._axiosApi.get(url, {
      headers: {
        "Ocp-Apim-Subscription-Key": "70602e8ff99f4ebb8aae2781c417fcc5",
        "Content-Type": "application/json"
      }
    }).then(res => {
      return res.data
    }).catch(err => {
     return {error: err}
    })
  }

  private async  CallTranslateTextApi(text: string, type: string) {
    let data = {
      documents: [{ id: 1, text: text }]
    };
    return this._axiosApi.post(`${this.textTransalteBaseUrl + type}`, JSON.stringify(data), {
      headers: this.textTranslateHeaders
    }).then(res => {
      return res.data;
    }).catch(err => {
      console.log(err);
    })
  }

  private async detectFace(url) {
    let data = JSON.stringify({ url: url });
    return this._axiosApi.post(`https://eastus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&recognitionModel=recognition_02&returnRecognitionModel=false&detectionModel=detection_01`, data, {
      headers: {
        "Ocp-Apim-Subscription-Key": "607670eec0d746bdb0607a1db29fe6ce",
        "Content-Type": "application/json"
      }
    }).then(res => {
      return res.data;
    }).catch(err => {
      console.log(err);
    })
  }



  private async AddFaceToPerson(personGroupId: string, personId: string, url: string) {
    let data = JSON.stringify({ url: url });
    return this._axiosApi.post(`https://eastus.api.cognitive.microsoft.com/face/v1.0/persongroups/${personGroupId}/persons/${personId}/persistedFaces?detectionModel=detection_01`, data, {
      headers: {
        "Ocp-Apim-Subscription-Key": "607670eec0d746bdb0607a1db29fe6ce",
        "Content-Type": "application/json"
      }
    }).then(res => {
      return res.data;
    }).catch(err => {
      console.log(err);
    })
  }

  private async CreatePerosnNamePersonGroup(personGroupId: string, personName: string) {
    let data = JSON.stringify({ name: personName, userData: personName });
    return this._axiosApi.post(`https://eastus.api.cognitive.microsoft.com/face/v1.0/persongroups/${personGroupId}/persons`, data, {
      headers: {
        "Ocp-Apim-Subscription-Key": "607670eec0d746bdb0607a1db29fe6ce",
        "Content-Type": "application/json"
      }
    }).then(res => {
      return res.data;
    }).catch(err => {
      console.log(err);
    })
  }

  private async TrainPeronsGroup(personGroupId: string) {
    return this._axiosApi.post(`https://eastus.api.cognitive.microsoft.com/face/v1.0/persongroups/${personGroupId}/train`, '', {
      headers: {
        "Ocp-Apim-Subscription-Key": "607670eec0d746bdb0607a1db29fe6ce",
        "Content-Type": "application/json"
      }
    }).then(res => {
      return res.data;
    }).catch(err => {
      console.log(err);
    })
  }


}
