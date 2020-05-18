import { Customer } from "../../domain/entities/customer";
import { Product } from "../../domain/entities/product";
import { AddProductToCartRequest } from "../../domain/product-api-models/AddProductToCartRequest";

export interface ICustomerService{
    GetOrdersByCustomerId(id: number): Promise<Customer[]>;
    GetAllProducts(): Promise<Product[]>;
    GetProductDetailsById(id: number): Promise<Product>;
    AddProductTocart(request: AddProductToCartRequest): Promise<Number[]>;
    CheckOut(customerId: number);
}