import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'jobs' })
export class JobPortal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  title: string;

  @Column({ type: 'text', nullable: false})
  companyName: string;

  @Column({ type: 'text', nullable: false })
  location: string;

  @Column({ type: 'text', nullable: false })
  jobType: string;

  @Column({ type: 'numeric', nullable: false })
  minSalary: number;

  @Column({ type: 'numeric', nullable: false })
  maxSalary: number;

  @Column({ type:'date', nullable: false})
  deadline: Date;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'enum', enum: ['Draft', 'Published'] ,default: 'Draft'})
  status: string;
}
