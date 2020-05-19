import { AddProductToCartRequest } from './../../domain/product-api-models/AddProductToCartRequest';
import { IAzureCogService } from '../services/IAzureCogService';
import * as express from "express";
import { controller, response, BaseHttpController, requestParam, requestBody, httpPost } from 'inversify-express-utils';
import { inject } from 'inversify';
import TYPES from '../../domain/constant/types';



@controller('/congservice')
export class CustomerController extends BaseHttpController {

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
    @requestBody() reqbody: {text: string},
    @response() res: express.Response
  ) {

    return this._AzureCogService.TranlateText(langid, reqbody.text);
  }

  @httpPost('/textanlytics')
  public async Textanlytics(
    @requestBody() reqbody: {text: string},
    @response() res: express.Response
  ) {
    return this._AzureCogService.Textanlytics(reqbody.text);
  }

  @httpPost('/ocr/text')
  public async GetProductDetailsById(
    @requestBody() reqbody: {url: string},
  ) {
    return this._AzureCogService.ReadOcrImage(reqbody.url);
  }

  @httpPost('/product/addtocart')
  public async AddToCart(
    @requestBody() product: AddProductToCartRequest,
    @response() res: express.Response
  ) {
  }

  @httpPost('/checkout/:customerid')
  public async checkout(
    @requestParam("customerid") id: number,
    @response() res: express.Response
  ) {
  }


}
