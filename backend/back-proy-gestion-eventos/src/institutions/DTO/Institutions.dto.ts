import { IsNumber, IsNotEmpty, IsString, Min} from "class-validator";

export class InstitutionsDto{

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    institutionID: number;
    
    @IsNotEmpty()
    @IsString()
    name : string;

}
