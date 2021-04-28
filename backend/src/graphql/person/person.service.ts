import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Person, PersonDocument } from './person.entity';

@Injectable()
export class PersonService {
  constructor(
    @InjectModel(Person.name) private personModel: Model<PersonDocument>,
  ) {}

  async findEveryone(): Promise<Person[]> {
    return this.personModel.find().exec();
  }

  async findPersonByID(id: string | ObjectId): Promise<Person> {
    return this.personModel.findById(id).exec();
  }

  async findPersonByName(name: string): Promise<Person> {
    return this.personModel.findOne({ name }).exec();
  }

  async findPeopleWithIDs(personIDs: string[] | ObjectId[]): Promise<Person[]> {
    // Currently, there is an issue with Typescript on the .map() method
    // with union or array types (see: https://github.com/microsoft/TypeScript/issues/36390)
    // The workaround is to cast the array of IDs to 'any[]' to use .map()
    return this.personModel
      .find({ _id: { $in: personIDs } })
      .exec()
      .then((unorderedPeople) =>
        (personIDs as any[]).map((id) =>
          unorderedPeople.find((person) => person.id === String(id)),
        ),
      );
  }
}
