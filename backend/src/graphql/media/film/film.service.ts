import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Film, FilmDocument } from './film.entity';

@Injectable()
export class FilmService {
  constructor(@InjectModel(Film.name) private filmModel: Model<FilmDocument>) {}

  async findAll(): Promise<Film[]> {
    return this.filmModel.find().exec();
  }

  async findByID(id: string | ObjectId): Promise<Film> {
    return this.filmModel.findById(id).exec();
  }

  async findByTitle(title: string): Promise<Film> {
    return this.filmModel.findOne({ title }).exec();
  }

  async findByMultipleIDs(filmIDs: string[] | ObjectId[]): Promise<Film[]> {
    // Currently, there is an issue with Typescript on the .map() method
    // with union or array types (see: https://github.com/microsoft/TypeScript/issues/36390)
    // The workaround is to cast the array of IDs to 'any[]' to use .map()
    return this.filmModel
      .find({ _id: { $in: filmIDs } })
      .exec()
      .then((unorderedFilms) =>
        (filmIDs as any[]).map((id) =>
          unorderedFilms.find((film) => film.id === String(id)),
        ),
      );
  }
}
