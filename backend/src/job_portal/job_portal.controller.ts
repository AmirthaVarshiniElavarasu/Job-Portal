import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobPortalService.findOne(+id);
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
