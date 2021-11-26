import { Status } from "src/status/Entities/status.entity";
import { Users } from "src/users/Entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('ScheduledEvent')
export class ScheduledEvent {
    
    @PrimaryGeneratedColumn()
    scheduledEventId: number;
    
    @Column({type:'varchar',length:100,nullable:false})
    name: string;
    
    @Column({type:'varchar',length:500,nullable:false})
    description_: string;

    @Column({ type: 'datetime', nullable:false, default: () => "CURRENT_TIMESTAMP"})
    startDate: Date;

    @Column({ type: 'datetime', nullable:false})
    endDate: Date;

    @Column({ type: 'time', nullable:false, default: () => "CURRENT_TIMESTAMP"})
    startHour: Date;

    @Column({ type: 'time', nullable:false})
    endHour: Date;

    //Cada que se registre un participante nuevo deberia editarse este campo y reducir una unidad
    @Column({type: 'int', nullable:true, default:0})
    places: string;
        
    @Column({type: 'varchar', nullable:false})
    modality:string
    
    @Column({name:'status'})
    statusId:number
    
    @ManyToOne(type => Status,Status => Status.StatusID)
    @JoinColumn({name:'status'})
    StatusID!: Status;

    @Column({name:'managerId'})
    managerId:number
    
    @ManyToOne(type => Users, Users=> Users.EventID) 
    @JoinColumn({name:'managerId'})
    UsersID!: Users;

}
