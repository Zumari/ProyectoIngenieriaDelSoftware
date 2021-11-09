import { Institutions } from 'src/institutions/Entities/Institutions.entity';
import { Status } from 'src/status/Entities/status.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne, OneToMany, JoinColumn, AfterUpdate, BeforeUpdate, BeforeInsert } from 'typeorm';
/*
import { UserEntity } from '../../users/Entities/user.entity';
import { StatusEntity } from '../../status/Entities/status.entity';
*/

@Entity('Event')
export class Event {
    
    @PrimaryGeneratedColumn()
    eventId: number;
    
    @Column({type:'varchar',length:50,nullable:false})
    name: string;
    
    @Column({type:'varchar',length:500,nullable:false})
    description_: string;

    @Column({ type: 'datetime', nullable:false, default: () => "CURRENT_TIMESTAMP"})
    startDate: Date;

    @Column({ type: 'datetime', nullable:false})
    endDate: Date;

    @Column({type: 'int', nullable:true, default:0})
    places: string;
    
    @Column({type: 'bit', default: true , nullable:false})
    openEvent: boolean;
    
    @ManyToOne(type => Institutions,Institutions => Institutions.InstitutionID)
    InstitutionID!: Institutions;
        
    @ManyToOne(type => Status,Status => Status.StatusID)
    StatusID!: Status;


    /*
    @OneToOne(type => StatusEntity, status => status.event)
    statusId: StatusEntity;
    @ManyToOne(type => UserEntity, user => user.events)
    organizerId: UserEntity;
    */

}
