import { getConnection, Connection } from "typeorm";
import { injectable } from "inversify";
import { IGenericRepository } from "../../interfaces_adapters/repositories/IGenericRepository";

@injectable()
export class GenericRepository implements IGenericRepository {

   public getConnection(): Connection {
        const conn = getConnection();
        return conn;
    }

    public getRepository(T: any) {
        const movieRepository = this.getConnection().getRepository(T);
        return movieRepository;
    }

}
