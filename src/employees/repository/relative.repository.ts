import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Relative, RelativeDocument } from '../Entities/Relative.schema';
import { Model } from 'mongoose';
import { RelativeRequestDto } from '../dto/RelativeRequest.dto';

@Injectable()
export class RelativeRepository {
  constructor(
    @InjectModel(Relative.name) private relativeModel: Model<RelativeDocument>,
  ) {}

  async create(relativeRequestDto: RelativeRequestDto): Promise<Relative> {
    const newRelative = new this.relativeModel(relativeRequestDto);
    return await newRelative.save();
  }

  async findAll() {
    return await this.relativeModel.find().populate('employeeId');
  }
}
