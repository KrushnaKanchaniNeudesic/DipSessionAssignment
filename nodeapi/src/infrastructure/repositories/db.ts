import { OrderInformation } from './../../domain/entities/orderinformation';
import { Order } from './../../domain/entities/order';
import { Cart } from '../../domain/entities/cart';
import { createConnection } from "typeorm";
import { Product } from "../../domain/entities/product";
import { Customer } from '../../domain/entities/customer';


/*
Please set the env var:

export DATABASE_USER=postgres \
export DATABASE_PASSWORD=secret \
export DATABASE_HOST=localhost \
export DATABASE_PORT=5432 \
export DATABASE_DB=demo

*/

export async function getDbConnection() {

    // const DATABASE_HOST = process.env.DATABASE_HOST || "localhost";
    // const DATABASE_USER = process.env.DATABASE_USER || "";
    // const DATABASE_PORT = 5432;
    // const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || "";
    // const DATABASE_DB = "demo";
    const DATABASE_HOST = "localhost";
    const DATABASE_USER = "testuser";
    const DATABASE_PORT = 1433;
    const DATABASE_PASSWORD = "pass@123";
    const DATABASE_DB = "ProductsInventoryDB";

    const entities = [
        Product,
        Cart,
        Customer,
        Order,
        OrderInformation
    ];

    const conn = await createConnection({
        type: "mssql",
        host: DATABASE_HOST,
        port: DATABASE_PORT,
        username: DATABASE_USER,
        password: DATABASE_PASSWORD,
        database: DATABASE_DB,
        entities: entities,
    }).catch(err=>{
        console.log(err);
    });

    return conn;

}
