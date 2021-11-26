import { Injectable } from '@nestjs/common';
import { ScheduledEventDTO } from './DTO/scheduledEvent.dto';

@Injectable()
export class ScheduledEventService {
    updateScheduledEvent(scheduledEventId: string, body: ScheduledEventDTO) {
        throw new Error('Method not implemented.');
    }
    deleteScheduledEvent(scheduledEventId: string) {
        throw new Error('Method not implemented.');
    }
    findAllScheduledEvents() {
        throw new Error('Method not implemented.');
    }
    createScheduledEvent(body: ScheduledEventDTO) {
        throw new Error('Method not implemented.');
    }
    getOneScheduledEvent(scheduledEventId: string) {
        throw new Error('Method not implemented.');
    }
}
