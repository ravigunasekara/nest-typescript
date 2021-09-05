import { Module } from '@nestjs/common';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './service/employees.service';
import { EmployeeRepository } from './repository/employee.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Employee, EmployeeSchema } from './Entities/Employee.schema';
import { Relative, RelativeSchema } from './Entities/Relative.schema';
import { RelativesController } from './relatives.controller';
import { RelativesService } from './service/relatives.service';
import { RelativeRepository } from './repository/relative.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema },
      { name: Relative.name, schema: RelativeSchema },
    ]),
  ],
  controllers: [EmployeesController, RelativesController],
  providers: [
    EmployeesService,
    EmployeeRepository,
    RelativesService,
    RelativeRepository,
  ],
})
export class EmployeesModule {}
