import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class loginUsers{

@IsNotEmpty()
@IsEmail()
email:string

@IsNotEmpty()
@IsString()
password_:string
}