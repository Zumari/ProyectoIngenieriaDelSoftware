import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Institutions')
export class Institutions{
    @PrimaryGeneratedColumn()
    InstitutionID:number;

    @Column({type:'varchar',length:50,nullable:false})
    name:string
}