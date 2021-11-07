import { Body, Controller, Delete, Get, Param,Post, Put } from '@nestjs/common';
import { createUserDto } from './DTO/createUser.dto';
import { updateUser } from './DTO/updateUser.dto';
import{UsersService} from './users.service'

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService){}
    
    @Get('/getUser/:email')
    async getUser(@Param('email') id:string){
       return  await  this.userService.findOne(id);
    }

    @Post('/register')
    async createNewUsers(@Body() createNewUser:createUserDto){
        return await this.userService.addUser(createNewUser); 
    }


    @Get('/getAllUsers')
   async  getAllUsers(){
      return this.userService.findAll()  
    }

    @Delete('/deleteUser/:email')
    async deleteUser(@Param('email') id:string){
        return await this.userService.deleteUser(id)  
    }

    @Put('/updateUser/:email')
    async updateUser(@Param('email') id:string,@Body() user:updateUser){
      return this.userService.updateUser(id,user)  ;
    }
}
