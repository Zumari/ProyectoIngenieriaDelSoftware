import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class loginUser {
    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsNotEmpty()
    @IsString()
    password:string;
}
