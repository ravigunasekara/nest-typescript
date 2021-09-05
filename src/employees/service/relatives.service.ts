import { RelativeRepository } from '../repository/relative.repository';
import { RelativeRequestDto } from '../dto/RelativeRequest.dto';
import { Relative } from '../Entities/Relative.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RelativesService {
  constructor(private relativeRepository: RelativeRepository) {}

  async create(relativeCreateDTO: RelativeRequestDto): Promise<Relative> {
    return await this.relativeRepository.create(relativeCreateDTO);
  }

  async getAll(): Promise<Relative[]> {
    return await this.relativeRepository.findAll();
  }
}
