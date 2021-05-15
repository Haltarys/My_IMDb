import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Film, FilmDocument } from './film.entity';
import { mapOrder } from 'src/utils/mapOrder';

@Injectable()
export class FilmService {
  constructor(@InjectModel(Film.name) private filmModel: Model<FilmDocument>) {}

  async findAll(): Promise<Film[]> {
    return this.filmModel.find().exec();
  }

  async findById(id: string | ObjectId): Promise<Film> {
    return this.filmModel.findById(id).exec();
  }

  async findByTitle(title: string): Promise<Film> {
    return this.filmModel.findOne({ title }).exec();
  }

  async findByMultipleIds(ids: string[] | ObjectId[]): Promise<Film[]> {
    return this.filmModel
      .find({ _id: { $in: ids } })
      .exec()
      .then((unorderedFilms) => mapOrder(unorderedFilms, ids));
  }
}
