import { Module } from '@nestjs/common';
import { CourseService } from './course.service.js';
import { CourseController } from './course.controller.js';
import { SupabaseProviderModule } from '../common/provider/supabase/supabase.module.js';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CourseMongoose,
  CourseMongooseSchema,
} from './entities/course-entity.js';
import { CourseMongooseService } from './course-mongoose.service.js';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../common/auth/auth.guard.js';
import { RolesGuard } from '../common/auth/role.guard.js';
import { AuthModule } from '../common/auth/auth.module.js';

@Module({
  imports: [
    SupabaseProviderModule,
    MongooseModule.forFeature([
      { name: CourseMongoose.name, schema: CourseMongooseSchema },
    ]),
  ],
  controllers: [CourseController],
  providers: [
    CourseService,
    CourseMongooseService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class CourseModule {}
