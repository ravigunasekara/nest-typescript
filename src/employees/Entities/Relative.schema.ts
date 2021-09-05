import { Employee } from './Employee.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type RelativeDocument = Relative & mongoose.Document;

@Schema()
export class Relative {
  @Prop()
  id: string;
  @Prop()
  firstName: string;
  @Prop()
  lastName: string;
  @Prop()
  relationship: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' })
  employeeId: Employee;
}

export const RelativeSchema = SchemaFactory.createForClass(Relative);
