import { Module } from '@nestjs/common';
import { EventImagesService } from './event-images.service';

@Module({
  providers: [EventImagesService]
})
export class EventImagesModule {}
