import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { JobPortalModule } from './job_portal/job_portal.module';

@Module({
  imports: [
    ConfigModule.forRoot( { isGlobal: true} ),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: async (configService: ConfigService)=> ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        post: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [join[process.cwd(),'dist/**/*.entity.js']],
        synchronize: true,
        autoLoadEntities: true,
      })
    }),
    JobPortalModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


