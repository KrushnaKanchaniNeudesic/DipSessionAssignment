import { IAzureCogService } from '../services/IAzureCogService';
import * as express from "express";
import { controller, response, BaseHttpController, requestParam, requestBody, httpPost } from 'inversify-express-utils';
import { inject } from 'inversify';
import TYPES from '../../domain/constant/types';



@controller('/congservice')
export class CongServiceController extends BaseHttpController {

  private readonly _AzureCogService: IAzureCogService;
  public constructor(
    @inject(TYPES.AzureCogService) AzureCogService: IAzureCogService
  ) {
    super();
    this._AzureCogService = AzureCogService;
  }

  @httpPost('/translatetext/:langid')
  public async Translatetext(
    @requestParam("langid") langid: string,
    @requestBody() reqbody: { text: string },
    @response() res: express.Response
  ) {

    return this._AzureCogService.TranlateText(langid, reqbody.text);
  }

  @httpPost('/textanlytics')
  public async Textanlytics(
    @requestBody() reqbody: { text: string },
    @response() res: express.Response
  ) {
    return this._AzureCogService.Textanlytics(reqbody.text);
  }

  @httpPost('/ocr/text')
  public async GetProductDetailsById(
    @requestBody() reqbody: { url: string },
  ) {
    return this._AzureCogService.ReadOcrImage(reqbody.url);
  }

  @httpPost('/matchface')
  public async MatchFace(
    @requestBody() reqbody: { personGroupId: string, url: string },
  ) {
    return this._AzureCogService.MatchFace(reqbody.personGroupId, reqbody.url);
  }

  @httpPost('/create/persongroup/:persongroupid')
  public async CreatePersonGroup(
    @requestParam("persongroupid") id: string,
    @response() res: express.Response
  ) {
    return this._AzureCogService.CreatePersonGroup(id);
  }

  @httpPost('/add/persongroup/person')
  public async AddPseronIntoPersonGroup(
    @requestBody() reqbody: { personGroupId: string, perosnName: string, url: string },
    @response() res: express.Response
  ) {
    return this._AzureCogService.AddPersonIntoPersonGroup(reqbody.personGroupId, reqbody.perosnName, reqbody.url)
  }

  @httpPost('/analyzefrom')
  public async AnalyzeForm(
    @requestBody() reqbody: {url: string },
    @response() res: express.Response
  ) {
    return this._AzureCogService.AnalyzeForm(reqbody.url);
  }

  @httpPost('/analyzefrom/getresult')
  public async AnalyzeFormGetResult(
    @requestBody() reqbody: {url: string },
    @response() res: express.Response
  ) {
    return this._AzureCogService.AnalyzeFormGetResult(reqbody.url);
  }


}
