import { PartialType } from '@nestjs/mapped-types';
import { CreateJobPortalDto } from './create-job_portal.dto';

export class UpdateJobPortalDto extends PartialType(CreateJobPortalDto) {}
