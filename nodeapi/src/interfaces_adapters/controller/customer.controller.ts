import { AddProductToCartRequest } from './../../domain/product-api-models/AddProductToCartRequest';
import { ICustomerService } from '../services/ICustomerService';
import * as express from "express";
import { controller, httpGet, response, BaseHttpController, requestParam, requestBody, httpPost } from 'inversify-express-utils';
import { inject } from 'inversify';
import TYPES from '../../domain/constant/types';



@controller('/customer')
export class CustomerController extends BaseHttpController {

  private readonly _customerService: ICustomerService;
  public constructor(
    @inject(TYPES.CustomerService) customerService: ICustomerService
  ) {
    super();
    this._customerService = customerService;
  }

  @httpGet('/orderhistory/:custmerid')
  public async DetailsById(
    @requestParam("custmerid") id: number,
    @response() res: express.Response
  ) {
    return this.ok(await this._customerService.GetOrdersByCustomerId(id));
  }

  @httpGet('/get/products')
  public async GetAllProducts() {
    return this.ok(await this._customerService.GetAllProducts());
  }

  @httpGet('/get/productsdetailsbyid/:id')
  public async GetProductDetailsById(
    @requestParam("id") id: number,
  ) {
    return this.ok(await this._customerService.GetProductDetailsById(id));
  }

  @httpPost('/product/addtocart')
  public async AddToCart(
    @requestBody() product: AddProductToCartRequest,
    @response() res: express.Response
  ) {
    return this.ok(await this._customerService.AddProductTocart(product));
  }

  @httpPost('/checkout/:customerid')
  public async checkout(
    @requestParam("customerid") id: number,
    @response() res: express.Response
  ) {
    return (await this._customerService.CheckOut(id));
  }


}
