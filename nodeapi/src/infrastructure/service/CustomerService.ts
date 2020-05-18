import { injectable, inject } from "inversify";
import TYPES from "../../domain/constant/types";
import { Repository } from "typeorm";
import { Cart } from '../../domain/entities/cart';
import { IGenericRepository } from '../../interfaces_adapters/repositories/IGenericRepository';
import { ICustomerService } from '../../interfaces_adapters/services/ICustomerService';
import { Customer } from '../../domain/entities/customer';
import { ProductApi } from "../external-api/product-api";
import { AxiosResponse } from "axios";
import { Product } from "../../domain/entities/product";
import { AddProductToCartRequest } from "../../domain/product-api-models/AddProductToCartRequest";


@injectable()
export class CustomerService implements ICustomerService {

  private readonly _customerRepository: Repository<Customer>;
  private readonly _productApi: ProductApi;

  public constructor(
    @inject(TYPES.CustomerRepository) customerRepository: Repository<Customer>,
    @inject(TYPES.CartRepository) cartRepository: Repository<Cart>,
    @inject(TYPES.GenericRepository) genericRepository: IGenericRepository,
    @inject(TYPES.ProductApi) productApi: ProductApi

  ) {
    this._customerRepository = customerRepository;
    this._productApi = productApi;
  }

  public async GetOrdersByCustomerId(id: number): Promise<Customer[]> {

    // this._customerRepository.createQueryBuilder('c1')
    //   .addSelect('r.id', 'orderid')
    //   .addSelect('p.name')
    //   .addSelect('ri.quantity')
    //   .innerJoin("orders", 'r', 'c1.id = r.customerid')
    //   .innerJoin("orderInformation", 'ri', 'r.id = ri.orderid')
    //   .innerJoin("product", 'p', 'p.id = ri.productid')
    //   .where('c1.id = ' + id)
    //   .getRawAndEntities().then(x => {
    //     console.log(x);
    //   }).catch(err => {
    //     console.log(err)
    //   })



    return this._customerRepository.find({
      where: {
        id: id
      },
      relations: ["orders", "orders.orderInfo"]
    });


  }

  public async GetAllProducts(): Promise<Product[]> {
    return await this._productApi.GetAllProducts().then((x: AxiosResponse<Product[]>) => {
      let { data } = x;
      return data;
    }).catch(x => {
      throw new Error();
    });
  }

  public async GetProductDetailsById(id: number): Promise<Product> {
    return this._productApi.GetProductDetailsById(id).then((x: AxiosResponse<Product>) => {
      let { data } = x;
      return data;
    }).catch(x => {
      throw new Error();
    });
  }

  public async AddProductTocart(request: AddProductToCartRequest): Promise<Number[]> {
    return this._productApi.AddProductToCart(request).then((x: AxiosResponse<Number[]>) => {
      let { data } = x;
      return data;
    }).catch(x => {
      throw new Error();
    });
  }

  public async CheckOut(customerId: number) {
    return await this._productApi.CheckOut(customerId).then((x) => {
      let {data} = x;
      return data;
    }).catch(x => {
      throw new Error();
    });

  }

}
