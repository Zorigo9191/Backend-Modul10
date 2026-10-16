import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto.js';
import { UpdateCourseDto } from './dto/update-course.dto.js';
import { SupabaseProvider } from '../common/provider/supabase/supabase.js';
import { Course } from './entities/course.entity.js';

@Injectable()
export class CourseService {
  constructor(private readonly supabaseProvider: SupabaseProvider) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const { data, error } = await this.supabaseProvider
      .getSupabaseClient()
      .from('course')
      .insert({ name: createCourseDto.name })
      .limit(1)
      .select()
      .single();

    if (error) {
      throw error;
    }

    if (!data) {
      throw new HttpException('No Course was created', HttpStatus.NOT_FOUND);
    }

    return data;
  }

  async findAll(): Promise<Course[]> {
    const { data: courses, error } = await this.supabaseProvider
      .getSupabaseClient()
      .from('course')
      .select('*');

    if (error) {
      throw error;
    }

    if (!courses) {
      throw new HttpException(
        'No courses data was found',
        HttpStatus.NOT_FOUND,
      );
    }

    return courses;
  }

  async findOne(id: number): Promise<Course> {
    const { data: course, error } = await this.supabaseProvider
      .getSupabaseClient()
      .from('course')
      .select('*')
      .eq('id', id)
      .limit(1);

    if (error) {
      throw error;
    }

    if (course?.length === 0) {
      throw new HttpException('No course data was found', HttpStatus.NOT_FOUND);
    }

    return course[0];
  }

  async update(id: number, updateCourseDto: UpdateCourseDto): Promise<Course> {
    const courseToUpdate: UpdateCourseDto = {};

    if (updateCourseDto?.name) {
      courseToUpdate.name = updateCourseDto.name;
    }

    const { data, error } = await this.supabaseProvider
      .getSupabaseClient()
      .from('course')
      .update(courseToUpdate)
      .eq('id', id)
      .limit(1)
      .select();

    if (error) {
      throw error;
    }

    if (data?.length === 0) {
      throw new HttpException(
        `Could not update course with id ${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return data[0];
  }

  async remove(id: number): Promise<void> {
    const { error } = await this.supabaseProvider
      .getSupabaseClient()
      .from('course')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }
  }
}
