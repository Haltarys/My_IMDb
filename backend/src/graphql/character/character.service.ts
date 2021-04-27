import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Character, CharacterDocument } from './character.entity';
import { IDType } from 'src/graphql/id-type';

@Injectable()
export class CharacterService {
  constructor(
    @InjectModel(Character.name)
    private characterModel: Model<CharacterDocument>,
  ) {}

  async findAllCharacters(): Promise<Character[]> {
    const characters = await this.characterModel.find().exec();

    return characters;
  }

  async findCharacterByID(id: IDType | ObjectId): Promise<Character> {
    const character = await this.characterModel.findById(id).exec();

    return character;
  }

  async findCharacterByName(name: string): Promise<Character> {
    const character = await this.characterModel.findOne({ name }).exec();

    return character;
  }

  async findCharactersWithIDs(
    characterIDs: IDType[] | ObjectId[],
  ): Promise<Character[]> {
    // Currently, there is an issue with Typescript on the .map() method
    // with union or array types (see: https://github.com/microsoft/TypeScript/issues/36390)
    // The workaround is to cast the array of IDs to 'any[]' to use .map()

    const characters = await this.characterModel
      .find({ _id: { $in: characterIDs } })
      .exec()
      .then((unorderedCharacters) =>
        (characterIDs as any[]).map((id) =>
          unorderedCharacters.find((character) => character.id === String(id)),
        ),
      );

    return characters;
  }
}
