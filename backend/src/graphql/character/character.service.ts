import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Character, CharacterDocument } from './character.entity';
import { mapOrder } from 'src/utils/mapOrder';

@Injectable()
export class CharacterService {
  constructor(
    @InjectModel(Character.name)
    private characterModel: Model<CharacterDocument>,
  ) {}

  async findAll(): Promise<Character[]> {
    return this.characterModel.find().exec();
  }

  async findById(id: string | ObjectId): Promise<Character> {
    return this.characterModel.findById(id).exec();
  }

  async findByName(name: string): Promise<Character> {
    return this.characterModel.findOne({ name }).exec();
  }

  async findByMultipleIds(ids: string[] | ObjectId[]): Promise<Character[]> {
    return this.characterModel
      .find({ _id: { $in: ids } })
      .exec()
      .then((unorderedCharacters) => mapOrder(unorderedCharacters, ids));
  }
}
