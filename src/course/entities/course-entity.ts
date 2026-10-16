import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class CourseMongoose {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, default: Date.now() })
  created_at: string;
}

export const CourseMongooseSchema =
  SchemaFactory.createForClass(CourseMongoose);
