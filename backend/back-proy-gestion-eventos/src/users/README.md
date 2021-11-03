POST :http://localhost:3000/users/createUser 

formato de json que se espera en el back
{
"email":"kevinvarela@gmail.com",
"password_":"nkdlkn27",
"firstName":"kevin",
"middleName":"Daniel",
"lastName":"kevinvarela@gmail.com",
"secondLastName":"7898ujlkdsnfds",
"academicTraining":"ingenieria en sistemas",
"description_":"soy un estudiante de la unah que quiere podeer obtener mas conocimientos",
"interests":"poder aprender mas",
"institutionRepresenting":"UNAH"
}


GET:http://localhost:3000/users/getAllUsers -> pra obtener todos los usuarios de la base de datos
formato de json que se envia del back

{
    "message": "exit",
    "data": [
        {
            "email": "kevinvarela@gmail.com",
            "firstName": "kevin",
            "middleName": "Daniel",
            "lastName": "kevinvarela@gmail.com",
            "secondLastName": "7898ujlkdsnfds",
            "academicTraining": "ingenieria en sistemas",
            "description_": "soy un estudiante de la unah que quiere podeer obtener mas conocimientos",
            "interests": "poder aprender mas",
            "password_": "nkdlkn27",
            "institutionRepresenting": "UNAH"
        }
    ]
}


GET oneUser=http://localhost:3000/users/getUser/kevinvarela@gmail.com ; donde  kevinvarela@gmail.com es el parametro que se espera en el backend

json que se envia del back
{
    "email": "kevinvarela@gmail.com",
    "firstName": "kevin",
    "middleName": "Daniel",
    "lastName": "kevinvarela@gmail.com",
    "secondLastName": "7898ujlkdsnfds",
    "academicTraining": "ingenieria en sistemas",
    "description_": "soy un estudiante de la unah que quiere podeer obtener mas conocimientos",
    "interests": "poder aprender mas",
    "password_": "nkdlkn27",
    "institutionRepresenting": "UNAH"
}


DELETE =http://localhost:3000/users/deleteUser/kevinvarela@gmail.com

JSON ENVIADO CUANDO SE ELIMINA UN USUARIO
{
    "message": "usuario eliminado con exito",
    "user": {
        "email": "kevinvarela@gmail.com",
        "firstName": "kevin",
        "middleName": "Daniel",
        "lastName": "kevinvarela@gmail.com",
        "secondLastName": "7898ujlkdsnfds",
        "academicTraining": "ingenieria en sistemas",
        "description_": "soy un estudiante de la unah que quiere podeer obtener mas conocimientos",
        "interests": "poder aprender mas",
        "password_": "nkdlkn27",
        "institutionRepresenting": "UNAH"
    }
}


PUT (UPDATE)=http://localhost:3000/users/updateUser/kevinvarela@gmail.com
campos a eliminar en formato json:
{
"interests":"poder aprender mininin",
"institutionRepresenting":"cato"
}

Json que devuelve el backend con los datos del usuario modificado
{
    "email": "kevinvarela@gmail.com",
    "firstName": "kevin",
    "middleName": "Daniel",
    "lastName": "varela",
    "secondLastName": "vasquez",
    "academicTraining": "ingenieria en sistemas",
    "description_": "soy un estudiante de la unah que quiere podeer obtener mas conocimientos",
    "interests": "poder aprender mininin",
    "password_": "nkdlkn27",
    "institutionRepresenting": "cato"
}

en caso de que intenten cambiar el correo electronico (ya que sirve como id)
{
    "statusCode": 400,
    "message": [
        "property email should not exist"
    ],
    "error": "Bad Request"
}