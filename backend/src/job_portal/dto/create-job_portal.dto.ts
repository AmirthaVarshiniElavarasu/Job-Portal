import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateJobPortalDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  jobType: string;

  @IsNumber()
  minSalary: number;

  @IsNumber()
  maxSalary: number;

  @IsDate()
  @Type(() => Date)
  deadline: Date;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(['Draft', 'Published'])
  status: string;

  
}
