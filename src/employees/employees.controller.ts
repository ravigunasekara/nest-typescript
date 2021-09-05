import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { EmployeesService } from './service/employees.service';
import { EmployeeSearchDto } from './dto/EmployeeSearch.dto';
import { EmployeeUpdateDto } from './dto/EmployeeUpdate.dto';
import { EmployeeRequestDto } from './dto/EmployeeRequest.dto';
import { EmployeeSquadValidationPipe } from '../employee-squad-validation.pipe';
import { Employee } from './Entities/Employee.schema';

@Controller('employees')
export class EmployeesController {
  constructor(private employeeService: EmployeesService) {}

  @Get()
  async getEmployees(@Query() param: EmployeeSearchDto): Promise<Employee[]> {
    // if (Object.keys(param).length) {
    //   return this.employeeService.searchEmployee(param);
    // }
    return await this.employeeService.getAllEmployees();
  }

  @Post()
  @UsePipes(ValidationPipe)
  @UsePipes(new EmployeeSquadValidationPipe())
  async createEmployee(@Body() employeeRequest: EmployeeRequestDto): Promise<Employee> {
    return await this.employeeService.createEmployee(employeeRequest);
  }

  @Get('/:id')
  getEmployeeById(@Param('id') id: string) {
    return this.employeeService.searchEmployeeById(id);
  }

  @Put('/:id/designation')
  updateEmployeeFromId(
    @Param('id') id: string,
    @Body() param: EmployeeUpdateDto,
  ) {
    param.id = id;
    return this.employeeService.updateEmployeeById(param);
  }

  @Delete('/:id')
  @HttpCode(204)
  deleteEmployeeFromId(@Param('id') id: string) {
    if (!this.employeeService.deleteEmployFromId(id)) {
      throw new NotFoundException('Employee does not Exist');
    }
  }
}
