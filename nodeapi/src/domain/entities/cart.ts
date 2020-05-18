import {
    Entity,
    Column,
} from "typeorm";
import { CustomBaseEntity } from "./custome-baseentity";

@Entity()
export class Cart extends CustomBaseEntity {
   
    @Column("int")
    public productid!: number;
    
    @Column("int")
    public customerid!: number;

    @Column("int")
    public quantity!: number;

}