import { IsEmail, isEmpty, IsInt, IsNotEmpty, IsString, isString} from "class-validator";

export class createUserDto{

    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    @IsString()
    firstName : string;

    @IsNotEmpty()
    @IsString()
    middleName  : string;

    @IsNotEmpty()
    @IsString()
    Lastname : string;

    @IsNotEmpty()
    @IsString()
    secondLastname : string;

    @IsNotEmpty()
    @IsString()
    academicTraining  : string;

    @IsNotEmpty()
    @IsString()
    description_ : string;

    @IsNotEmpty()
    @IsString()
    Interests : string;

    @IsNotEmpty()
    password_: string;

    @IsNotEmpty()
    @IsString()
    institution_representing:string;

}
