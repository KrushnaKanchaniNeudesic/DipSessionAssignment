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

  private async  CallTranslateTextApi(text: string, type: string) {
    let data = {
      documents: [
        {
          id: 1,
          text: text
        }

      ]
    };
    return this._axiosApi.post(`${this.textTransalteBaseUrl + type}`, JSON.stringify(data), {
      headers: this.textTranslateHeaders
    }).then(res => {
      return res.data;
    }).catch(err => {
      console.log(err);
    })
  }



  // public async GetOrdersByCustomerId(id: number): Promise<Customer[]> {

  //   // this._customerRepository.createQueryBuilder('c1')
  //   //   .addSelect('r.id', 'orderid')
  //   //   .addSelect('p.name')
  //   //   .addSelect('ri.quantity')
  //   //   .innerJoin("orders", 'r', 'c1.id = r.customerid')
  //   //   .innerJoin("orderInformation", 'ri', 'r.id = ri.orderid')
  //   //   .innerJoin("product", 'p', 'p.id = ri.productid')
  //   //   .where('c1.id = ' + id)
  //   //   .getRawAndEntities().then(x => {
  //   //     console.log(x);
  //   //   }).catch(err => {
  //   //     console.log(err)
  //   //   })



  //   return this._customerRepository.find({
  //     where: {
  //       id: id
  //     },
  //     relations: ["orders", "orders.orderInfo"]
  //   });


  // }

  // public async GetAllProducts(): Promise<Product[]> {
  //   return await this._productApi.GetAllProducts().then((x: AxiosResponse<Product[]>) => {
  //     let { data } = x;
  //     return data;
  //   }).catch(x => {
  //     throw new Error();
  //   });
  // }

  // public async GetProductDetailsById(id: number): Promise<Product> {
  //   return this._productApi.GetProductDetailsById(id).then((x: AxiosResponse<Product>) => {
  //     let { data } = x;
  //     return data;
  //   }).catch(x => {
  //     throw new Error();
  //   });
  // }

  // public async AddProductTocart(request: AddProductToCartRequest): Promise<Number[]> {
  //   return this._productApi.AddProductToCart(request).then((x: AxiosResponse<Number[]>) => {
  //     let { data } = x;
  //     return data;
  //   }).catch(x => {
  //     throw new Error();
  //   });
  // }

  // public async CheckOut(customerId: number) {
  //   return await this._productApi.CheckOut(customerId).then((x) => {
  //     let {data} = x;
  //     return data;
  //   }).catch(x => {
  //     throw new Error();
  //   });

  // }

}
