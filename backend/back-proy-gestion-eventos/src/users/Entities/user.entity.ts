import { BeforeInsert, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import* as bcrypt from'bcrypt';
import { Console } from "console";

@Entity('Users')
export class Users{

    constructor(email: string, firstName: string, middleName: string,lastName,secondLastName:string,
      academicTraining: string,description_ :string,interests:string,password_:string,institutionRepresenting:string) {
      this.email=email;
      this.password_=password_;
      this.academicTraining=academicTraining;
      this.description_=description_;
      this.firstName=firstName;
      this.middleName=middleName;
      this.institutionRepresenting=institutionRepresenting;
      this.interests=interests;
      this.lastName=lastName;
      this.secondLastName=secondLastName;
    }

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
    @Column()
    institutionRepresenting: string;
    @BeforeInsert()
    async hashPassword() {
      //const salt = await bcrypt.genSalt();
      this.password_ = await bcrypt.hash(this.password_, 10);
    }
  
    async validatePassword(password: string): Promise<boolean> { 
     const result= await bcrypt.compare(password,this.password_)
     console.log(result,this.email,this.password_);
     return result;
    }
}