import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Person, PersonDocument } from './person.entity';
import { mapOrder } from 'src/utils/mapOrder';

@Injectable()
export class PersonService {
  constructor(
    @InjectModel(Person.name) private personModel: Model<PersonDocument>,
  ) {}

  async findAll(): Promise<Person[]> {
    return this.personModel.find().exec();
  }

  async findById(id: string | ObjectId): Promise<Person> {
    return this.personModel.findById(id).exec();
  }

  async findByName(name: string): Promise<Person> {
    return this.personModel.findOne({ name }).exec();
  }

  async findByMultipleIds(ids: string[] | ObjectId[]): Promise<Person[]> {
    return this.personModel
      .find({ _id: { $in: ids } })
      .exec()
      .then((unorderedPeople) => mapOrder(unorderedPeople, ids));
  }
}
