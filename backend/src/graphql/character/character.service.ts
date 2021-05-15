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

  async findByID(id: string | ObjectId): Promise<Character> {
    return this.characterModel.findById(id).exec();
  }

  async findByName(name: string): Promise<Character> {
    return this.characterModel.findOne({ name }).exec();
  }

  async findByMultipleIDs(
    characterIDs: string[] | ObjectId[],
  ): Promise<Character[]> {
    return this.characterModel
      .find({ _id: { $in: characterIDs } })
      .exec()
      .then((unorderedCharacters) =>
        mapOrder(unorderedCharacters, characterIDs),
      );
  }
}
