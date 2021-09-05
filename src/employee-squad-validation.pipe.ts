import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { EmployeeSquad } from './employees/EmployeeSquad.enum';

@Injectable()
export class EmployeeSquadValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!(value.squad in EmployeeSquad)) {
      throw new BadRequestException(`Invalid squad: ${value.squad}`);
    }
    return value;
  }
}
