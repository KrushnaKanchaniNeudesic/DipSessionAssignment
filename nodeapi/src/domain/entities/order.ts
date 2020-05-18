import { OrderInformation } from './orderinformation';
import {
    Entity,
    ManyToOne,
    OneToMany,
} from "typeorm";
import { CustomBaseEntity } from "./custome-baseentity";
import { Customer } from './customer';

@Entity('Orders')
export class Order extends CustomBaseEntity {
    
    @ManyToOne(type => Customer, or => or.orders)
    customer: Customer;

    @OneToMany(type => OrderInformation, or => or.order)
    orderInfo: OrderInformation[];

}