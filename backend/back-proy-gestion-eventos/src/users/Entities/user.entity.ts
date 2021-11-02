import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('Users_')
export class Users_{
    @PrimaryColumn()
    email: string;
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
    password_: string;
    @Column()
    institution_representing: string;
}