import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobPortal } from './entities/job_portal.entity';
import { CreateJobPortalDto } from './dto/create-job_portal.dto';
import { UpdateJobPortalDto } from './dto/update-job_portal.dto';
import {
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  formatDistanceToNow,
} from 'date-fns';

@Injectable()
export class JobPortalService {
  constructor(
    @InjectRepository(JobPortal)
    private readonly jobRepository: Repository<JobPortal>,
  ) {}

  // Helper function to calculate "time ago"
  private getTimeAgo(createdAt: Date): string {
  
    return formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  }

  // CREATE a new job
  async create(createJobPortalDto: CreateJobPortalDto) {
    const { minSalary, maxSalary } = createJobPortalDto;

    if (minSalary >= maxSalary) {
      throw new BadRequestException(
        'Minimum salary must be less than maximum salary',
      );
    }

    const job = this.jobRepository.create(createJobPortalDto);
    const savedJob = await this.jobRepository.save(job);

    return {
      message: 'Job created successfully',
      data: savedJob,
    };
  }

  // GET all jobs
  async findAll() {
    const jobs = await this.jobRepository.find({
      order: { id: 'DESC' },
    });

    const jobsWithTimeAgo = jobs.map((job) => ({
      ...job,
      timeAgo: this.getTimeAgo(job.createdAt),
    }));

    return {
      message: 'All jobs fetched successfully',
      data: jobsWithTimeAgo,
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
      data: {
        ...job,
        timeAgo: this.getTimeAgo(job.createdAt),
      },
    };
  }

  // UPDATE job
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
      throw new BadRequestException(
        'Minimum salary must be less than maximum salary',
      );
    }

    Object.assign(job, updateJobPortalDto);
    const updatedJob = await this.jobRepository.save(job);

    return {
      message: 'Job updated successfully',
      data: updatedJob,
    };
  }

  // GET published jobs
  async findPublished() {
    const jobs = await this.jobRepository.find({
      where: { status: 'Published' },
      order: { id: 'DESC' },
    });

    const jobsWithTimeAgo = jobs.map((job) => ({
      ...job,
      timeAgo: this.getTimeAgo(job.createdAt),
    }));

    return {
      message: 'Published jobs fetched successfully',
      data: jobsWithTimeAgo,
    };
  }

  // DELETE job
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

  // SEARCH jobs by title, location, jobType, and salary range
  async search(query: {
    title?: string;
    location?: string;
    jobType?: string;
    minSalary?: number;
    maxSalary?: number;
  }) {
    const qb = this.jobRepository.createQueryBuilder('job');

    const title = (query.title && query.title.trim().toLowerCase()) || '';
    const location = (query.location && query.location.trim().toLowerCase()) || '';
    const jobType = (query.jobType && query.jobType.trim().toLowerCase()) || '';
    const minSalary = query.minSalary ? Number(query.minSalary) : undefined;
    const maxSalary = query.maxSalary ? Number(query.maxSalary) : undefined;

    const hasAnyFilter =
      (title && title !== '') ||
      (location && location !== '') ||
      (jobType && jobType !== '') ||
      minSalary !== undefined ||
      maxSalary !== undefined;

    if (!hasAnyFilter) {
      const allJobs = await this.jobRepository.find({ order: { id: 'DESC' } });

      const jobsWithTimeAgo = allJobs.map((job) => ({
        ...job,
        timeAgo: this.getTimeAgo(job.createdAt),
      }));

      return {
        message: 'All jobs fetched successfully (no filters applied)',
        count: jobsWithTimeAgo.length,
        data: jobsWithTimeAgo,
      };
    }

    if (title) {
      qb.andWhere('LOWER(job.title) LIKE :title', { title: `%${title}%` });
    }

    if (location) {
      qb.andWhere('LOWER(job.location) LIKE :location', {
        location: `%${location}%`,
      });
    }

    if (jobType) {
      qb.andWhere('LOWER(job.jobType) LIKE :jobType', {
        jobType: `%${jobType}%`,
      });
    }

    if (minSalary !== undefined && maxSalary !== undefined) {
      qb.andWhere('(job.minSalary >= :minSalary AND job.maxSalary <= :maxSalary)', {
        minSalary,
        maxSalary,
      });
    } else if (minSalary !== undefined) {
      qb.andWhere('job.minSalary >= :minSalary', { minSalary });
    } else if (maxSalary !== undefined) {
      qb.andWhere('job.maxSalary <= :maxSalary', { maxSalary });
    }

    const results = await qb.orderBy('job.id', 'DESC').getMany();

    if (results.length === 0) {
      return {
        message: 'No matching jobs found',
        count: 0,
        data: [],
      };
    }

    const resultsWithTimeAgo = results.map((job) => ({
      ...job,
      timeAgo: this.getTimeAgo(job.createdAt),
    }));

    return {
      message: 'Filtered jobs fetched successfully',
      count: resultsWithTimeAgo.length,
      data: resultsWithTimeAgo,
    };
  }

  // GET salary range (for slider)
  async getSalaryRange() {
    const qb = this.jobRepository
      .createQueryBuilder('job')
      .select('MIN(job.minSalary)', 'minSalary')
      .addSelect('MAX(job.maxSalary)', 'maxSalary');

    const result = await qb.getRawOne();

    return {
      message: 'Salary range fetched successfully',
      data: {
        minSalary: Number(result.minSalary) || 0,
        maxSalary: Number(result.maxSalary) || 0,
      },
    };
  }
}
