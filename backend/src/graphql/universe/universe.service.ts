import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
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
    // Currently, there is an issue with Typescript on the .map() method
    // with union or array types (see: https://github.com/microsoft/TypeScript/issues/36390)
    // The workaround is to cast the array of IDs to 'any[]' to use .map()
    return this.universeModel
      .find({ _id: { $in: universeIDs } })
      .exec()
      .then((unorderedUniverses) =>
        (universeIDs as any[]).map((id) =>
          unorderedUniverses.find((universe) => universe.id === String(id)),
        ),
      );
  }
}
