import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { JobPortalService } from './job_portal.service';
import { CreateJobPortalDto } from './dto/create-job_portal.dto';
import { UpdateJobPortalDto } from './dto/update-job_portal.dto';

@Controller('jobs')
export class JobPortalController {
  constructor(private readonly jobPortalService: JobPortalService) {}

  @Post()
  create(@Body() createJobPortalDto: CreateJobPortalDto) {
    return this.jobPortalService.create(createJobPortalDto);
  }

  @Get()
  findAll() {
    return this.jobPortalService.findAll();
  }

  @Get('published')
  findPublished() {
    return this.jobPortalService.findPublished();
  }

  // ✅ Search route MUST come before :id
  @Get('search')
  search(
    @Query('title') title?: string,
    @Query('location') location?: string,
    @Query('jobType') jobType?: string,
    @Query('minSalary') minSalary?: string,
    @Query('maxSalary') maxSalary?: string,
  ) {
    const filters = {
      title,
      location,
      jobType,
      minSalary: minSalary ? parseInt(minSalary) : undefined,
      maxSalary: maxSalary ? parseInt(maxSalary) : undefined,
    };
    return this.jobPortalService.search(filters);
  }

  @Get('salary-range')
  getSalaryRange() {
    return this.jobPortalService.getSalaryRange();
  }

  // ⚠️ Keep this LAST
  @Get(':id')
  findOne(@Param('id') id: string) {
    const parsedId = Number(id);
    if (isNaN(parsedId)) {
      return this.jobPortalService.findAll();
    }
    return this.jobPortalService.findOne(parsedId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobPortalDto: UpdateJobPortalDto) {
    return this.jobPortalService.update(+id, updateJobPortalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobPortalService.remove(+id);
  }
}
