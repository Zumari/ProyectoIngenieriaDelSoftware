import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Status')
export class Status{
    @PrimaryGeneratedColumn()
    StatusID:number;

    @Column({type:'varchar',length:50,nullable:false})
    name:string
}