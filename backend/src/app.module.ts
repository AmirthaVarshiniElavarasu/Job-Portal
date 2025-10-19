import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { JobPortalModule } from './job_portal/job_portal.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres', // Explicitly define the driver
        url: configService.get<string>('DATABASE_URL'),
        ssl: {
          rejectUnauthorized: false, //Required for Render DB SSL
        },
        autoLoadEntities: true,
        synchronize: true, // Keep true for your internship project
        entities: [join(process.cwd(), 'dist/**/*.entity.js')],
      }),
    }),
    JobPortalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
