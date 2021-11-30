import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/user/events/events.service';
import { Event } from 'src/app/interfaces/event';
import { faBookmark, faLock, faPlus, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InstitutionService } from 'src/app/services/institutions/institutions.service';
import { institution } from 'src/app/interfaces/institution';
import { Router } from '@angular/router';
import { GeneralUserService } from 'src/app/services/user/general-user/general-user.service';
import { DatePipe } from '@angular/common';
import { ValidadoresEspeciales, dateValidator } from 'src/app/util/ValidadorEspecial';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularFireStorage} from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  faPlusCube = faPlus;
  faPlus = faPlusCircle;
  faBookmark = faBookmark;
  faLock = faLock;
  mode: string = 'virtual';
  privacy: string = 'publico';
  typeEvent: string = 'conferencia';
  keyword: string = '';
  previsualizacion: string="";
  urlImage: string="";
  urlImage2!: Observable<string>;
  nameImage="";


  eventosLista : Event[]=[{
    eventId:0,
    image: '',
    name:'',
    description_:'',
    startDate:'',
    endDate:'',
    places: 0,
    openEvent: true,
    institutionId: 0,
    statusId:0,
    userId:0,
    modality:'',
  }]; //Arreglo de eventos para recorrer y pintar el html con NGFOR

  eventoForm = new FormGroup({
    photo : new FormControl(''),
    name: new FormControl('',[Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-ZÑÁÉÍÓÚáéíóú][a-zA-Zñáéíóú ]{1,}')]),
    description_:new FormControl('',Validators.compose([Validators.required, Validators.maxLength(300), Validators.pattern('[a-zA-ZÑÁÉÍÓÚáéíóú][a-zA-Zñáéíóú ]{1,}')])),
    startDate: new FormControl('', [Validators.required, ValidadoresEspeciales.ValidarFechas]),
    endDate: new FormControl('', [Validators.required]),
    places:  new FormControl(0, [ Validators.min(0)]),
    openEvent:  new FormControl(true, [Validators.required]),
    institutionId: new FormControl(0,[Validators.required, Validators.min(0)]),
    modality: new FormControl('', Validators.required)
  },{validators:dateValidator});

  conferenciaForm = new FormGroup({
    name: new FormControl('',[Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-ZÑÁÉÍÓÚáéíóú][a-zA-Zñáéíóú ]{1,}')]),
    description_:new FormControl('',Validators.compose([Validators.required, Validators.maxLength(300), Validators.pattern('[a-zA-ZÑÁÉÍÓÚáéíóú][a-zA-Zñáéíóú ]{1,}')])),
    startDate: new FormControl('', [Validators.required, ValidadoresEspeciales.ValidarFechas]),
    endDate: new FormControl('', [Validators.required]),
    startTime: new FormControl('', [Validators.required]),
    endTime: new FormControl('', [Validators.required]),
    openEvent:  new FormControl(true, [Validators.required]),
    modality: new FormControl('', Validators.required)
  },{validators:dateValidator})

  institutions: institution[]=[{
    InstitutionID:0,
    name:""
  }];

  public fechaMinima: Date;
  public fechaStrMinima:string ;
  constructor(private eventServ: EventsService,
    private institutionServ: InstitutionService,
    private router: Router,
    private generalService: GeneralUserService,
    private pipe:DatePipe,
    private generalUserService:GeneralUserService,
    private sanitizer: DomSanitizer,
    private storage: AngularFireStorage) {
      this.fechaMinima= new Date(new Date().getFullYear(),new Date().getMonth(), new Date().getDate());
      this.fechaStrMinima= this.pipe.transform(this.fechaMinima, "yyyy-MM-dd")!;
     }

    ngOnInit(): void {
      let usuarioId= this.generalUserService.getEmail();
      this.getEvents(usuarioId);
      this.getInstitution();

    }

      extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
        try {
          const unsafeImg = window.URL.createObjectURL($event);
          const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
          const reader = new FileReader();
          reader.readAsDataURL($event);
          reader.onload = () => {
            resolve({
              base: reader.result
            });
          };
          reader.onerror = error => {
            resolve({
              base: null
            });
          };

        } catch (e) {
          throw null;
        }
      })

    capturarFile(event:any):any{
      const archivoCapturado=event.target.files[0];
      this.nameImage=archivoCapturado.name;
    /* this.extraerBase64(archivoCapturado).then((imagen: any) => {
        this.previsualizacion = imagen.base;
        console.log("base 64",imagen.base);
      })*/
      this.upload(archivoCapturado);
    }

    upload(file:any){
     const filePath=`upload/${file.name}`;
     const ref=this.storage.ref(filePath);
     const task=this.storage.upload(filePath,file)
     task.snapshotChanges().pipe(finalize(()=>{ref.getDownloadURL().subscribe(url=>{
       this.urlImage=url;
       console.log(url)
       console.log(this.urlImage);
     })})).subscribe();
    }

get photo (){
  return this.eventoForm.get('photo');
}
get name(){
  return this.eventoForm.get('name');
}
get description_(){
  return this.eventoForm.get('description_');
}
get startDate(){
  return this.eventoForm.get('startDate');
}
get endDate(){
  return this.eventoForm.get('endDate');
}
get places(){
  return this.eventoForm.get('places');
}
get openEvent(){
  return this.eventoForm.get('openEvent');
}
get institutionId(){
  return this.eventoForm.get('institutionId');
}
get modality(){
  return this.eventoForm.get('modality');
}

  createEvents(){
    this.eventoForm.value.institutionId=Number(this.eventoForm.value.institutionId)
    this.eventoForm.value.photo=this.urlImage;
    console.log("la url es ", this.urlImage);
    console.log(this.eventoForm.value);
    this.eventServ.createEvent(this.eventoForm.value,this.generalService.getEmail()).subscribe(
      res =>  {console.log(res)},
      error => console.log(error))
    this.router.initialNavigation;
  }

  getEvents(usuarioId:string){
    this.eventServ.getAllEventsDash(usuarioId).subscribe(
      res =>  {this.eventosLista=res},
      error => console.log(error)

    )
  }

  getInstitution(){
    this.institutionServ.getInstitutions().subscribe(
      res =>  {this.institutions=res},
      error => console.log(error)


    )
  }

  changeMod(val: number) {
    this.mode = val == 1 ? 'virtual' : 'presencial';
  }

  changePriv(val: number) {
    this.privacy = val == 1 ? 'publico' : 'privado';
  }

  changeType(val: number) {
    this.typeEvent = val == 1 ? 'conferencia': 'taller';
  }

  viewEvent(id: number) {
    this.router.navigate(['usuario/evento/'+id]);
  }
}
