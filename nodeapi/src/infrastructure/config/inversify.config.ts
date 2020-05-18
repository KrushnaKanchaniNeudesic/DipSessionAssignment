import { ProductApi } from '../external-api/product-api';
import { CustomerService } from '../service/CustomerService';
import { ICustomerService } from '../../interfaces_adapters/services/ICustomerService';
import { Customer } from '../../domain/entities/customer';
import { AsyncContainerModule } from "inversify";

import TYPES from "../../domain/constant/types";
import { Repository } from "typeorm";
import { GenericRepository } from "../repositories/GenericRepository";
import { getDbConnection } from "../repositories/db";
import { Cart } from "../../domain/entities/cart";
import { IGenericRepository } from "../../interfaces_adapters/repositories/IGenericRepository";
import TAGS from '../../domain/constant/tags';
import {config} from 'dotenv';
import { resolve } from 'path';


export const bindings = new AsyncContainerModule(async (bind) => {

    const path = resolve(__dirname, '../../environment.env')
    config({path: path});
    await getDbConnection();

    bind<string>(TAGS.ProductApiToken).toConstantValue(process.env.product_api_base_url);

    bind<IGenericRepository>(TYPES.GenericRepository).to(GenericRepository).inTransientScope();

    bind<Repository<Customer>>(TYPES.CustomerRepository).toDynamicValue((x) => {
        let as =  x.container.get<IGenericRepository>(TYPES.GenericRepository);
        return as.getRepository(Customer) as Repository<Customer>;
    }).inRequestScope();

    bind<Repository<Cart>>(TYPES.CartRepository).toDynamicValue((x) => {
        let as =  x.container.get<IGenericRepository>(TYPES.GenericRepository);
        return as.getRepository(Cart) as Repository<Cart>;
    }).inRequestScope();


    bind<ICustomerService>(TYPES.CustomerService).to(CustomerService).inTransientScope();
    bind<ProductApi>(TYPES.ProductApi).to(ProductApi).inTransientScope();

});
