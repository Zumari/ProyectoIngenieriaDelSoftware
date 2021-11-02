import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users} from './Entities/user.entity';
import { createUserDto } from './DTO/createUser.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
      ) {}

    async addUser(userNew:createUserDto){
    const post= this.usersRepository.create(userNew);
    const exists= await this.usersRepository.findOne(userNew.email);
    if(!exists){
        return await this.usersRepository.save(post);
    } 

    return {
        "message":"Este usuario ya esta  Registrado",
        "data":userNew
    }
    }

   async deleteUser(email:string){
       return await this.usersRepository.delete(email);
    }

    async updateUser(email:string,user:createUserDto){
         const post =this.usersRepository.findOne(email);
         if(!post) throw new NotFoundException('usuario no existe');

         const editPost =Object.assign(post,user);
         return await this.usersRepository.save(editPost);
    }

    async findAll(){
        const data= await this.usersRepository.find();
        return {
            "message":"exit",
            data
        }
    }

    async findOne(email:string){
        const data= await this.usersRepository.findOne(email);
        return {
            "message":"exit",
            data
        }
    }


}
