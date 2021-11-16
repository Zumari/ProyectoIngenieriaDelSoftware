
import { AbstractControl, FormControl, FormControlName, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";




export class ValidadoresEspeciales{
  public static ValidarFechas(elemento:FormControl){
    let texto= elemento.value;
    let invalido:boolean=false;
    let aux:Date= new Date(texto);
    let fechaseleccionada:Date = new Date(aux.getFullYear(),aux.getUTCMonth(), aux.getUTCDate());
     invalido = (fechaseleccionada<new Date(new Date().getFullYear(),new Date().getMonth(), new Date().getDate()))
    return invalido? {fechainvalida:true}:null; 
  }
}