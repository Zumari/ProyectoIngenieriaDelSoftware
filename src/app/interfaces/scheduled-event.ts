export interface ScheduledEvent{
    scheduledEventId: number;
    name: string;
    description_: string;
    startDate: Date;
    endDate: Date;
    startHour: Date;
    endHour: Date;
    //Cada que se registre un participante nuevo deberia editarse este campo y reducir una unidad
    places: string;
    modality:string;
    statusId:number;
    managerId:string;
    eventId:number;
}