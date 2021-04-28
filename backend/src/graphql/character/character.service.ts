import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Character, CharacterDocument } from './character.entity';

@Injectable()
export class CharacterService {
  constructor(
    @InjectModel(Character.name)
    private characterModel: Model<CharacterDocument>,
  ) {}

  async findAllCharacters(): Promise<Character[]> {
    return this.characterModel.find().exec();
  }

  async findCharacterByID(id: string | ObjectId): Promise<Character> {
    return this.characterModel.findById(id).exec();
  }

  async findCharacterByName(name: string): Promise<Character> {
    return this.characterModel.findOne({ name }).exec();
  }

  async findCharactersWithIDs(
    characterIDs: string[] | ObjectId[],
  ): Promise<Character[]> {
    // Currently, there is an issue with Typescript on the .map() method
    // with union or array types (see: https://github.com/microsoft/TypeScript/issues/36390)
    // The workaround is to cast the array of IDs to 'any[]' to use .map()
    return this.characterModel
      .find({ _id: { $in: characterIDs } })
      .exec()
      .then((unorderedCharacters) =>
        (characterIDs as any[]).map((id) =>
          unorderedCharacters.find((character) => character.id === String(id)),
        ),
      );
  }
}
