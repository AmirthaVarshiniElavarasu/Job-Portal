import { Injectable } from '@nestjs/common';
import { CreateJobPortalDto } from './dto/create-job_portal.dto';
import { UpdateJobPortalDto } from './dto/update-job_portal.dto';

@Injectable()
export class JobPortalService {
  create(createJobPortalDto: CreateJobPortalDto) {
    return 'This action adds a new jobPortal';
  }

  findAll() {
    return `This action returns all jobPortal`;
  }

  findOne(id: number) {
    return `This action returns a #${id} jobPortal`;
  }

  update(id: number, updateJobPortalDto: UpdateJobPortalDto) {
    return `This action updates a #${id} jobPortal`;
  }

  remove(id: number) {
    return `This action removes a #${id} jobPortal`;
  }
}
