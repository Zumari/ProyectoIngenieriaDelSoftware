import { Institutions } from "src/institutions/Entities/Institutions.entity";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('Users')
export class Users{

    @PrimaryColumn()
    email: string;
    @Column()
    firstName: string;
    @Column()
    middleName: string;
    @Column()
    lastName : string;
    @Column()
    secondLastName : string;
    @Column()
    academicTraining: string;
    @Column()
    description_: string;
    @Column()
    interests: string;
    @Column()
    password_: string;
    
    @ManyToOne(type => Institutions,Institutions => Institutions.InstitutionID)
    institutionRepresenting!: Institutions;
    
}