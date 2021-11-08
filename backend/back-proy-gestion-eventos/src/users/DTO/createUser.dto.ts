import { IsEmail, isEmpty, IsInt, IsNotEmpty, IsNumber, IsString, isString} from "class-validator";

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
    lastName : string;

    @IsNotEmpty()
    @IsString()
    secondLastName : string;

    @IsNotEmpty()
    @IsString()
    academicTraining  : string;

    @IsNotEmpty()
    @IsString()
    description_ : string;

    @IsNotEmpty()
    @IsString()
    interests : string;

    @IsNotEmpty()
     password_: string;

    @IsNotEmpty()
    @IsNumber()
    institutionRepresenting:number;

}
