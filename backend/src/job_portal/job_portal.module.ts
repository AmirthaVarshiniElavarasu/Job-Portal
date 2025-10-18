import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobPortalService } from './job_portal.service';
import { JobPortalController } from './job_portal.controller';
import { JobPortal } from './entities/job_portal.entity';

@Module({
   imports: [TypeOrmModule.forFeature([JobPortal])],
  controllers: [JobPortalController],
  providers: [JobPortalService],
})
export class JobPortalModule {}
