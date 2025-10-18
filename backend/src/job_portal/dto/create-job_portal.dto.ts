import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(['Draft', 'Published'])
  status: string;
}
