import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobPortal } from './entities/job_portal.entity';
import { CreateJobPortalDto } from './dto/create-job_portal.dto';
import { UpdateJobPortalDto } from './dto/update-job_portal.dto';

@Injectable()
export class JobPortalService {
  constructor(
    @InjectRepository(JobPortal)
    private readonly jobRepository: Repository<JobPortal>,
  ) {}

  // CREATE a new job
  async create(createJobPortalDto: CreateJobPortalDto) {
    const { minSalary, maxSalary } = createJobPortalDto;

    // Validate salary range
    if (minSalary >= maxSalary) {
      throw new BadRequestException('Minimum salary must be less than maximum salary');
    }

    const job = this.jobRepository.create(createJobPortalDto);
    const savedJob = await this.jobRepository.save(job);

    return {
      message: 'Job created successfully',
      data: savedJob,
    };
  }

  // GET all jobs (sorted by latest)
  async findAll() {
    const jobs = await this.jobRepository.find({
      order: { id: 'DESC' },
    });

    return {
      message: 'All jobs fetched successfully',
      data: jobs,
    };
  }

  // GET one job by ID
  async findOne(id: number) {
    const job = await this.jobRepository.findOneBy({ id });

    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }

    return {
      message: 'Job fetched successfully',
      data: job,
    };
  }

  // UPDATE job by ID
  async update(id: number, updateJobPortalDto: UpdateJobPortalDto) {
    const job = await this.jobRepository.findOneBy({ id });

    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }

    if (
      updateJobPortalDto.minSalary !== undefined &&
      updateJobPortalDto.maxSalary !== undefined &&
      updateJobPortalDto.minSalary >= updateJobPortalDto.maxSalary
    ) {
      throw new BadRequestException('Minimum salary must be less than maximum salary');
    }

    Object.assign(job, updateJobPortalDto);
    const updatedJob = await this.jobRepository.save(job);

    return {
      message: 'Job updated successfully',
      data: updatedJob,
    };
  }

  async findPublished() {
  const jobs = await this.jobRepository.find({
    where: { status: 'Published' },
    order: { id: 'DESC' },
  });

  return {
    message: 'Published jobs fetched successfully',
    data: jobs,
  };
}


  // DELETE job by ID
  async remove(id: number) {
    const job = await this.jobRepository.findOneBy({ id });

    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }

    await this.jobRepository.remove(job);

    return {
      message: 'Job deleted successfully',
      data: { id },
    };
  }
}
