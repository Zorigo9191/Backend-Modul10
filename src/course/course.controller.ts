import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CourseService } from './course.service.js';
import { CreateCourseDto } from './dto/create-course.dto.js';
import { UpdateCourseDto } from './dto/update-course.dto.js';
import { CourseMongooseService } from './course-mongoose.service.js';
import { Public } from '../common/auth/public.decorater.js';
import { Roles } from '../common/auth/role.decorator.js';
import { Role } from '../common/auth/role.enum.js';

@Controller('course')
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    private readonly courseMongooseService: CourseMongooseService,
  ) {}

  @Public()
  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseMongooseService.create(createCourseDto);
    // return this.courseService.create(createCourseDto);
  }

  @Get()
  @Roles(Role.Admin, Role.User)
  // @UseGuards(AuthGuard)
  findAll() {
    return this.courseMongooseService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin)
  findOne(@Param('id') id: string) {
    return this.courseMongooseService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseMongooseService.update(id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseMongooseService.remove(id);
  }
}
