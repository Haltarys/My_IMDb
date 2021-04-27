import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Person, PersonDocument } from './person.entity';
import { IDType } from 'src/graphql/id-type';

@Injectable()
export class PersonService {
  constructor(
    @InjectModel(Person.name) private personModel: Model<PersonDocument>,
  ) {}

  async findEveryone(): Promise<Person[]> {
    const everyone = await this.personModel.find().exec();

    return everyone;
  }

  async findPersonByID(id: IDType | ObjectId): Promise<Person> {
    const person = await this.personModel.findById(id).exec();

    return person;
  }

  async findPersonByName(name: string): Promise<Person> {
    const person = await this.personModel.findOne({ name }).exec();

    return person;
  }

  async findPeopleWithIDs(personIDs: IDType[] | ObjectId[]): Promise<Person[]> {
    // Currently, there is an issue with Typescript on the .map() method
    // with union or array types (see: https://github.com/microsoft/TypeScript/issues/36390)
    // The workaround is to cast the array of IDs to 'any[]' to use .map()

    const people = await this.personModel
      .find({ _id: { $in: personIDs } })
      .exec()
      .then((unorderedPeople) =>
        (personIDs as any[]).map((id) =>
          unorderedPeople.find((person) => person.id === String(id)),
        ),
      );

    return people;
  }
}
