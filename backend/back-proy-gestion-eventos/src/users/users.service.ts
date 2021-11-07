import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users} from './Entities/user.entity';
import { createUserDto } from './DTO/createUser.dto';
import* as bcrypt from'bcrypt';
import { updateUser } from './DTO/updateUser.dto';
import { Institutions } from 'src/institutions/Entities/Institutions.entity';
import { InstitutionsService } from 'src/institutions/institutions.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
        private institutionService : InstitutionsService,
      ) {}

      async addUser(userNew:createUserDto){
        const {email,firstName,middleName,lastName,secondLastName,academicTraining, description_,interests ,password_, institutionRepresenting}=userNew;
        const exists= await this.usersRepository.findOne(userNew.email);
        const institutionUser= await this.institutionService.getOneInstitution(institutionRepresenting);
        if(!exists){
            const post= this.usersRepository.create({email,firstName,middleName,lastName,secondLastName,academicTraining, description_,interests ,password_, institutionRepresenting:institutionUser});
            await this.usersRepository.save(post);
            return{
                "message":"Registro realizado con exito"
            }
        } 
        return {
            "message":`El  usuario ${firstName} ya existe dentro de la aplicacion`,
            "data":userNew
        }        
    }

   async deleteUser(email:string){
       const user=await this.usersRepository.findOne(email);
       if(!user) return {"mesage":"Este usuario no existe dentro de la aplicacion"}
       
       await this.usersRepository.delete(email);
       return{
           "message":`usuario ${user.firstName}con correo ${user.email} ha sido eliminado con exito`
        }
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
        if(!user) return {"mesage":`El usuario ${user.firstName} con correo ${user.email} no existe dentro de la aplicacion`}

        return {
            "message":"exit",
            user
        }
    }

    async findUserAuth(id:string):Promise<Users>{
        const user= await this.usersRepository.findOne(id);
        if(!user) return null

        return user;
    }

    //trabaja jimmy
}
