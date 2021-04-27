import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Film, FilmDocument } from './film.entity';
import { IDType } from 'src/graphql/id-type';

@Injectable()
export class FilmService {
  constructor(@InjectModel(Film.name) private filmModel: Model<FilmDocument>) {}

  async findAllFilms(): Promise<Film[]> {
    const films = await this.filmModel.find().exec();

    return films;
  }

  async findFilmByID(id: IDType | ObjectId): Promise<Film> {
    const film = await this.filmModel.findById(id).exec();

    return film;
  }

  async findFilmByTitle(title: string): Promise<Film> {
    const film = await this.filmModel.findOne({ title }).exec();

    return film;
  }

  async findFilmsWithIDs(filmIDs: IDType[] | ObjectId[]): Promise<Film[]> {
    // Currently, there is an issue with Typescript on the .map() method
    // with union or array types (see: https://github.com/microsoft/TypeScript/issues/36390)
    // The workaround is to cast the array of IDs to 'any[]' to use .map()

    const films = await this.filmModel
      .find({ _id: { $in: filmIDs } })
      .exec()
      .then((unorderedFilms) =>
        (filmIDs as any[]).map((id) =>
          unorderedFilms.find((film) => film.id === String(id)),
        ),
      );

    return films;
  }
}
