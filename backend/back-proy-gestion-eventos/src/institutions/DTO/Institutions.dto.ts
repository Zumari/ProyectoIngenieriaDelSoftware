import { IsNumber, IsNotEmpty, IsString, Min} from "class-validator";

export class InstitutionsDto{
    
    @IsNotEmpty()
    @IsString()
    name : string;

}
