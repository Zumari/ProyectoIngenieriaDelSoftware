import { IsInt, IsNotEmpty, IsString, IsDateString, IsOptional,} from "class-validator";

export class ScheduledEventDTO {
    
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

    @IsNotEmpty()
    @IsDateString()
    startHour : Date;
    
    @IsNotEmpty()
    @IsDateString()
    endHour : Date;

    @IsOptional()
    @IsInt()
    places: string;
    
    @IsNotEmpty()
    @IsString()
    modality: string;

    @IsNotEmpty()
    @IsString()
    managerId:string
}
