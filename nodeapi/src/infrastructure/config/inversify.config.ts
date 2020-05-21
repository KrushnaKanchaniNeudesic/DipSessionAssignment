import { AxiosApi } from './../external-api/axios-api';
import { AzureCogService } from '../service/AzureCogService';
import { IAzureCogService } from '../../interfaces_adapters/services/IAzureCogService';

import { AsyncContainerModule } from "inversify";

import TYPES from "../../domain/constant/types";
import TAGS from '../../domain/constant/tags';
import {config} from 'dotenv';
import { resolve } from 'path';


export const bindings = new AsyncContainerModule(async (bind) => {

    const path = resolve(__dirname, '../../environment.env')
    config({path: path});

    bind<string>(TAGS.ProductApiToken).toConstantValue(process.env.product_api_base_url);


    bind<IAzureCogService>(TYPES.AzureCogService).to(AzureCogService).inTransientScope();
    bind<AxiosApi>(TYPES.AxisApi).to(AxiosApi).inTransientScope();

});
