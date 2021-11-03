import { PartialType,OmitType } from "@nestjs/mapped-types";
import { createUserDto} from "./createUser.dto";


export class updateUsers extends PartialType(OmitType(createUserDto,['email'])){

}