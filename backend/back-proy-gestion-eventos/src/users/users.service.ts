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
        let exists= await this.usersRepository.findOne(userNew.email);
      //  const institutionFound= await this.institutionService.getOneInstitution(institutionRepresenting);
      let institutionFound=new Institutions()
      institutionFound.InstitutionID=userNew.institutionRepresenting;
      institutionFound.name="equisde"

      if(!exists){
            const salt= await bcrypt.genSalt();
            const hashedPassword= await bcrypt.hash(password_,salt);
            exists.email=userNew.email
            exists.firstName=userNew.firstName
            exists.middleName=userNew.middleName
            exists.lastName=userNew.lastName
            exists.secondLastName=userNew.secondLastName
            exists.academicTraining=userNew.academicTraining
            exists.description_=userNew.description_
            exists.interests=userNew.interests
            exists.password_=hashedPassword
            exists.institutionRepresenting=institutionFound
            const post= this.usersRepository.create(exists);
            await this.usersRepository.save(post);
            return{
                "message":"Registro realizado con exito"
            }

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
