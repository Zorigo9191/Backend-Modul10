import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto.js';
import { UpdateCourseDto } from './dto/update-course.dto.js';
import { SupabaseProvider } from '../common/provider/supabase/supabase.js';
import { Course } from './entities/course.entity.js';
import { CourseMongoose } from './entities/course-entity.js';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CourseMongooseService {
  constructor(
    @InjectModel(CourseMongoose.name)
    private readonly courseMongoose: Model<CourseMongoose>,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    // const { data, error } = await this.supabaseProvider
    //   .getSupabaseClient()
    //   .from('course')
    //   .insert({ name: createCourseDto.name })
    //   .limit(1)
    //   .select()
    //   .single();

    // if (error) {
    //   throw error;
    // }

    // if (!data) {
    //   throw new HttpException('No Course was created', HttpStatus.NOT_FOUND);
    // }

    // return data;
    const courseModel = new this.courseMongoose(createCourseDto);
    return courseModel.save();
  }

  async findAll(): Promise<Course[]> {
    //     //     const { data: courses, error } = await this.supabaseProvider
    //     //       .getSupabaseClient()
    //     //       .from('course')
    //     //       .select('*');
    //     //     if (error) {
    //     //       throw error;
    //     //     }
    //     //     if (!courses) {
    //     //       throw new HttpException(
    //     //         'No courses data was found',
    //     //         HttpStatus.NOT_FOUND,
    //     //       );
    //     //     }
    //     //     return courses;
    //     //   }
    //     //   async findOne(id: number): Promise<Course> {
    //     //     const { data: course, error } = await this.supabaseProvider
    //     //       .getSupabaseClient()
    //     //       .from('course')
    //     //       .select('*')
    //     //       .eq('id', id)
    //     //       .limit(1);
    //     //     if (error) {
    //     //       throw error;
    //     //     }
    //     //     if (course?.length === 0) {
    //     //       throw new HttpException('No course data was found', HttpStatus.NOT_FOUND);
    //     //     }
    //     //     return course[0];

    const courses = await this.courseMongoose.find().exec();
    if (courses?.length < 1) {
      throw new HttpException('No courses found', HttpStatus.NOT_FOUND);
    }

    return courses;
  }

  async findOne(id: string): Promise<Course> {
    const course = await this.courseMongoose.findById(id).exec();
    if (!course) {
      throw new HttpException(
        `Course with ID ${id} found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return course;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
    const courseToUpdate: UpdateCourseDto = {};
    if (updateCourseDto?.name) {
      courseToUpdate.name = updateCourseDto.name;
    }
    //     // const { data, error } = await this.supabaseProvider
    //     //   .getSupabaseClient()
    //     //   .from('course')
    //     //   .update(courseToUpdate)
    //     //   .eq('id', id)
    //     //   .limit(1)
    //     //   .select();
    //     // if (error) {
    //     //   throw error;
    //     // }
    //     // if (data?.length === 0) {
    //     //   throw new HttpException(
    //     //     `Could not update course with id ${id}`,
    //     //     HttpStatus.INTERNAL_SERVER_ERROR,
    //     //   );
    //     // }
    //     // return data[0];
    const updatedCourse = await this.courseMongoose
      .findByIdAndUpdate(id, courseToUpdate, { returnDocument: 'after' })
      .exec();

    if (!updatedCourse) {
      throw new HttpException(
        `Could not update course with id ${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return updatedCourse;
  }

  async remove(id: string): Promise<void> {
    //     //     const { error } = await this.supabaseProvider
    //     //       .getSupabaseClient()
    //     //       .from('course')
    //     //       .delete()
    //     //       .eq('id', id);
    //     //     if (error) {
    //     //       throw error;
    //     //     }
    //     //   }
    await this.courseMongoose.deleteOne({ _id: id }).exec();
  }
}
