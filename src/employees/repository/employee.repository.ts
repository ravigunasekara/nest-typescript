import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Employee, EmployeeDocument } from '../Entities/Employee.schema';
import { Model } from 'mongoose';
import { EmployeeRequestDto } from '../dto/EmployeeRequest.dto';
import { EmployeeSearchDto } from '../dto/EmployeeSearch.dto';
import { EmployeeUpdateDto } from '../dto/EmployeeUpdate.dto';
import * as mongoose from 'mongoose';
import {Relative} from "../Entities/Relative.schema";

@Injectable()
export class EmployeeRepository {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>,
  ) {}

  async create(requestEmployeeDto: EmployeeRequestDto): Promise<Employee> {
    const newEmployee = new this.employeeModel(requestEmployeeDto);
    return await newEmployee.save();
  }

  async findAll(): Promise<Employee[]> {
    return await this.employeeModel
      .find()
      .populate('relatives', null, Relative.name);
  }

  async findEmployee(id: string): Promise<Employee> {
    return await this.employeeModel.findOne({ _id: id });
  }

  async findWithFilters(filter: EmployeeSearchDto) {
    const name = Object.is(filter.firstName, undefined) ? '' : filter.firstName;
    const squad = Object.is(filter.squad, undefined) ? '' : filter.squad;
    return await this.employeeModel.find({
      $and: [
        { designation: { $regex: squad } },
        { firstName: { $regex: name } },
      ],
    });
  }
  async update(employee: EmployeeUpdateDto): Promise<Employee> {
    return await this.employeeModel.findOneAndUpdate(
      { _id: employee.id },
      { designation: employee.designation },
      {
        new: true,
      },
    );
  }
  async delete(id: string): Promise<boolean> {
    const objId = mongoose.Types.ObjectId(id);

    const ret = await this.employeeModel.deleteOne({ _id: objId });
    console.log(ret.n);
    return ret.n === 1;
  }
}
