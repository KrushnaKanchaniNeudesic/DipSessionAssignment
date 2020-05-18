import {
    Entity,
    Column,
    OneToMany,
} from "typeorm";
import { CustomBaseEntity } from "./custome-baseentity";
import { Order } from './order';

@Entity()
export class Customer extends CustomBaseEntity {
    
    @Column("text")
    public name!: number;

    @OneToMany(type=> Order, prd=> prd.customer)
    public orders!: Order[];

}