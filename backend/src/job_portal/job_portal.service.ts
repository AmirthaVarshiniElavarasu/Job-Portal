import { Injectable } from '@nestjs/common';
import { CreateJobPortalDto } from './dto/create-job_portal.dto';
import { UpdateJobPortalDto } from './dto/update-job_portal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JobPortal } from './entities/job_portal.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JobPortalService {

    constructor(
      @InjectRepository(JobPortal)
      private jobRepository: Repository<JobPortal>,
      ){}
    async create(createJobPortalDto: CreateJobPortalDto) {
     const job = this.jobRepository.create(createJobPortalDto);
    
    return await this.jobRepository.save(job);
  }

  async findAll() {
    return await this.jobRepository.find();
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
