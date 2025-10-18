import { Module } from '@nestjs/common';
import { JobPortalService } from './job_portal.service';
import { JobPortalController } from './job_portal.controller';

@Module({
  controllers: [JobPortalController],
  providers: [JobPortalService],
})
export class JobPortalModule {}
