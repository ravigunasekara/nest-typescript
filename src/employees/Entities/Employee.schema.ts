import { EmployeeSquad } from '../EmployeeSquad.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Relative } from './Relative.schema';

export type EmployeeDocument = Employee & Document;

@Schema()
export class Employee {
  @Prop()
  id: string;
  @Prop({ required: true })
  firstName: string;
  @Prop({ required: true })
  lastName: string;
  @Prop()
  designation: string;
  @Prop()
  squad: EmployeeSquad;
  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Relative' }) // @Prop(type: [Types.ObjectId], ref: Token.name)
  relatives: Relative[];
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
