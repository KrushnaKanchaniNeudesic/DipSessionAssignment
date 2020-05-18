import { Order } from './order';
import { Product } from './product';
import {
    Entity,
    Column,
    OneToMany,
    ManyToOne,
} from "typeorm";
import { CustomBaseEntity } from "./custome-baseentity";

@Entity('OrderInformation')
export class OrderInformation extends CustomBaseEntity {
    
    @Column("int")
    public orderid!: number;

    @OneToMany(type=> Product, prd=> prd.order)
    public products!: Product[];

    @ManyToOne(type=> Order, prd=> prd.orderInfo)
    public order!: Order;

    @Column("int")
    public quantity!: number;

}