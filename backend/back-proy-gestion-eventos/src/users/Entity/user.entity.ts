import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @Column()
    firstName: string;
    @Column()
    middleName: string;
    @Column()
    Lastname : string;
    @Column()
    secondLastname : string;
    @Column()
    academicTraining: string;
    @Column()
    description_: string;
    @Column()
    Interests: string;
    @Column()
    email: string;
    @Column()
    password_: string;
    @Column()
    institution_representing: number;
}