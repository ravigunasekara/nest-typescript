import { IsNotEmpty } from 'class-validator';

export class RelativeRequestDto {
  @IsNotEmpty()
  firstName: string;
  @IsNotEmpty()
  lastName: string;
  relationship: string;
  employeeId: string;
}
