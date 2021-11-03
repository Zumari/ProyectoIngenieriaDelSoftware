import { OmitType, PartialType } from "@nestjs/mapped-types";
import { createUserDto } from "./createUser.dto";

export class updateUser extends PartialType(OmitType(createUserDto,['email'])){}
