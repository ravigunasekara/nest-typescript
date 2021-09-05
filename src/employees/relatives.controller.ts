import { Body, Controller, Get, Post } from '@nestjs/common';
import { RelativesService } from './service/relatives.service';
import { RelativeRequestDto } from './dto/RelativeRequest.dto';
import { Relative } from './Entities/Relative.schema';

@Controller('relatives')
export class RelativesController {
  constructor(private relativeService: RelativesService) {}

  @Post()
  async create(@Body() relativeRequest: RelativeRequestDto): Promise<Relative> {
    return await this.relativeService.create(relativeRequest);
  }

  @Get()
  async getRelatives() {
    return await this.relativeService.getAll();
  }
}
