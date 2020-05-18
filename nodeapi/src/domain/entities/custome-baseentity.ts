import { Entity, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity()
export abstract class CustomBaseEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id!: number;
}