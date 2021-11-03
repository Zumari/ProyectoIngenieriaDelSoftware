import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users} from './Entities/user.entity';
import { createUserDto } from './DTO/createUser.dto';
import* as bcrypt from'bcrypt';
import { updateUser } from './DTO/updateUser.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
      ) {}

    async addUser(userNew:createUserDto){
        const {email,firstName,middleName,lastName,secondLastName,academicTraining, description_,interests ,password_, institutionRepresenting}=userNew;
        const exists= await this.usersRepository.findOne(userNew.email);
        if(!exists){
            const salt= await bcrypt.genSalt();
            const hashedPassword= await bcrypt.hash(password_,salt);
            const post= this.usersRepository.create({email,firstName,middleName,lastName,secondLastName,academicTraining, description_,interests ,password_:hashedPassword, institutionRepresenting});
            return await this.usersRepository.save(post);
        } 
        return {
            "message":"Este usuario ya esta  Registrado",
            "data":userNew
        }
        
    }

   async deleteUser(email:string){
       const user=await this.usersRepository.findOne(email);
       if(!user) return {"mesage":"Este usuario no existe dentro de la aplicacion"}

       await this.usersRepository.delete(email);
       return{
           "message":"usuario eliminado con exito",
           user}
    }

    async updateUser(email:string,user:updateUser){
         const post = await this.usersRepository.findOne(email);
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

    async findOne(id:string){
        const user= await this.usersRepository.findOne(id);
        if(!user) return {"mesage":"Este usuario no existe dentro de la aplicacion"}

        return {
            "message":"exit",
            user
        }
    }


}
