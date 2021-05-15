import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { mapOrder } from 'src/utils/mapOrder';
import { Universe, UniverseDocument } from './universe.entity';

@Injectable()
export class UniverseService {
  constructor(
    @InjectModel(Universe.name) private universeModel: Model<UniverseDocument>,
  ) {}

  async findAll(): Promise<Universe[]> {
    return this.universeModel.find().exec();
  }

  async findByID(id: string | ObjectId): Promise<Universe> {
    return this.universeModel.findById(id).exec();
  }

  async findByName(name: string): Promise<Universe> {
    return this.universeModel.findOne({ name }).exec();
  }

  async findByMultipleIDs(
    universeIDs: string[] | ObjectId[],
  ): Promise<Universe[]> {
    return this.universeModel
      .find({ _id: { $in: universeIDs } })
      .exec()
      .then((unorderedUniverses) => mapOrder(unorderedUniverses, universeIDs));
  }
}
