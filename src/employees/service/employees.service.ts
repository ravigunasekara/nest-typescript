import { Injectable, NotFoundException } from '@nestjs/common';
import { v1 as uuid } from 'uuid';
import { EmployeeSearchDto } from '../dto/EmployeeSearch.dto';
import { EmployeeUpdateDto } from '../dto/EmployeeUpdate.dto';
import { EmployeeRequestDto } from '../dto/EmployeeRequest.dto';
import { Employee } from '../Entities/Employee.schema';
import { EmployeeRepository } from '../repository/employee.repository';

@Injectable()
export class EmployeesService {
  private employees: Employee[] = [];

  constructor(private employeeRepository: EmployeeRepository) {}

  async getAllEmployees(): Promise<Employee[]> {
    return await this.employeeRepository.findAll();
  }

  async createEmployee(employeeRequest: EmployeeRequestDto): Promise<Employee> {
    /*const { firstName, lastName, designation, squad } = employeeRequest;

    const employee = {
      id: uuid(),
      firstName,
      lastName,
      designation,
      squad,
    };
    this.employees.push(employee);
    return employee;*/
    return await this.employeeRepository.create(employeeRequest);
  }

  async searchEmployee(employeeSearchDto: EmployeeSearchDto) {
    // const { firstName, squad } = employeeSearchDto;
    // let employees = this.getAllEmployees();
    // if (squad) {
    //   employees = employees.filter((employee) => employee.squad === squad);
    // }
    // if (firstName) {
    //   employees = employees.filter(
    //     (employee) => employee.firstName === firstName,
    //   );
    // }
    return await this.employeeRepository.findWithFilters(employeeSearchDto);
  }

  async searchEmployeeById(id: string): Promise<Employee> {
    // const employees = this.getAllEmployees();
    // const employee = employees.filter((emp) => emp.id === id)[0];
    // if (!employee) {
    //   throw new NotFoundException('Employee does not Exist');
    // }
    return await this.employeeRepository.findEmployee(id);
  }

  async updateEmployeeById(
    employeeUpdateDto: EmployeeUpdateDto,
  ): Promise<Employee> {
    // const employee = this.searchEmployeeById(employeeUpdateDto.id);
    // employee.designation = employeeUpdateDto.designation;
    return await this.employeeRepository.update(employeeUpdateDto);
  }

  async deleteEmployFromId(empId: string): Promise<boolean> {
    // const employees = this.getAllEmployees();
    // this.employees = employees.filter((employee) => employee.id != empId);
    // return !(this.employees.length == employees.length);
    return await this.employeeRepository.delete(empId);
  }
}
