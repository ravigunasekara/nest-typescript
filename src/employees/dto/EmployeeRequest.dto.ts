import { EmployeeSquad } from '../EmployeeSquad.enum';
import { IsNotEmpty } from 'class-validator';

export class EmployeeRequestDto {
    @IsNotEmpty()
    firstName: string
    @IsNotEmpty()
    lastName: string
    designation: string
    squad: EmployeeSquad
}
