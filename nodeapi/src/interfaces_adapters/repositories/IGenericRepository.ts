import { Connection } from "typeorm";

export interface IGenericRepository{
 getConnection(): Connection;
 getRepository(T: any);
}