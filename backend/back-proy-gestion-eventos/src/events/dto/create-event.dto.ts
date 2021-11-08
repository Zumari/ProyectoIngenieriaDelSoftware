import { IsEmail, isEmpty, IsInt, IsNotEmpty, IsString, IsDateString, IsBoolean, IsOptional} from "class-validator";

export class CreateEventDto {
    
    @IsNotEmpty()
    @IsString()
    name : string;
    
    @IsNotEmpty()
    @IsString()
    description_  : string;
    
    @IsNotEmpty()
    @IsDateString()
    startDate : Date;
    
    @IsNotEmpty()
    @IsDateString()
    endDate : Date;
    
    @IsOptional()
    @IsInt()
    places: string;

    @IsNotEmpty()
    @IsBoolean()
    openEvent: boolean;
}
