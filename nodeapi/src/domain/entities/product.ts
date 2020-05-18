import {
    Entity,
    Column,
    ManyToOne,
} from "typeorm";
import { CustomBaseEntity } from "./custome-baseentity";
import { OrderInformation } from "./orderinformation";

@Entity()
export class Product extends CustomBaseEntity {

    @Column("text")
    public name!: string;
    
    @Column("int")
    public price!: number;

    @Column("int")
    public quantity!: number;

    @ManyToOne(type => OrderInformation, or => or.products)
    order: OrderInformation;

}
