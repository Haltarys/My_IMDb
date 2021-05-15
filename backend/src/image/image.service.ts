import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { mkdir, rename } from 'fs/promises';
import { Model, ObjectId } from 'mongoose';
import { join } from 'path';
import { Person, PersonDocument } from 'src/graphql/person/person.entity';
import { Film, FilmDocument } from 'src/graphql/media/film/film.entity';
import {
  Universe,
  UniverseDocument,
} from 'src/graphql/universe/universe.entity';
import { ImageUploadParams } from './dto/image-upload-params.dto';
import { ImageCategory } from './enums/image-category.enum';
import { ImageName } from './enums/image-name.enum';

type ImageModel =
  | Model<PersonDocument>
  | Model<FilmDocument>
  | Model<UniverseDocument>;

@Injectable()
export class ImageService {
  constructor(
    @InjectModel(Person.name)
    private personModel: Model<PersonDocument>,
    @InjectModel(Film.name)
    private filmModel: Model<FilmDocument>,
    @InjectModel(Universe.name)
    private universeModel: Model<UniverseDocument>,
  ) {}

  private async makeImageDirectory(
    category: ImageCategory,
    id: string,
  ): Promise<string> {
    const path = join('public', 'images', category, id);

    await mkdir(path, { recursive: true });
    return path;
  }

  private async moveFile(
    currentPath: string,
    newPath: string,
    type: ImageName,
  ): Promise<string> {
    const path = join(newPath, `${type}.jpg`);

    await rename(currentPath, path);
    return path;
  }

  private pathToURL(filePath: string): string {
    const url = filePath.replace(/\\/g, '/').replace(/\/?public/, '');

    return encodeURI(url);
  }

  async saveImageOnDisk(
    params: ImageUploadParams,
    file: Express.Multer.File,
  ): Promise<string> {
    const dest = await this.makeImageDirectory(params.category, params.id);
    const path = await this.moveFile(file.path, dest, params.name);
    const url = this.pathToURL(path);

    return url;
  }

  private selectModelByCategory(category: ImageCategory): ImageModel {
    switch (category) {
      case ImageCategory.PEOPLE:
        return this.personModel;

      case ImageCategory.FILMS:
        return this.filmModel;

      case ImageCategory.UNIVERSES:
        return this.universeModel;

      default:
        return null;
    }
  }

  async documentExists(
    id: string | ObjectId,
    model: ImageModel,
  ): Promise<boolean> {
    return (model as any)
      .find({ _id: id })
      .limit(1)
      .countDocuments()
      .exec()
      .then((count: number) => count === 1);
  }

  async upsertImageInDocument(
    id: string | ObjectId,
    type: ImageName,
    url: string,
    model: ImageModel,
  ): Promise<Film> {
    return (model as any)
      .findByIdAndUpdate(id, { [type]: url }, { new: true })
      .exec();
  }

  async deleteImageInDocument(
    id: string | ObjectId,
    type: ImageName,
    model: ImageModel,
  ): Promise<Film> {
    return (model as any)
      .findByIdAndUpdate(id, { $unset: { [type]: 1 } }, { new: true })
      .exec();
  }

  async uploadImage(
    params: ImageUploadParams,
    file: Express.Multer.File,
  ): Promise<Film> {
    const model = this.selectModelByCategory(params.category);
    if (!model) return null;

    const filmExists = await this.documentExists(params.id, model);
    if (!filmExists) return null;

    const url = await this.saveImageOnDisk(params, file);
    return this.upsertImageInDocument(params.id, params.name, url, model);
  }

  async deleteImage(params: ImageUploadParams): Promise<Film> {
    const model = this.selectModelByCategory(params.category);
    if (!model) return null;

    const filmExists = await this.documentExists(params.id, model);
    if (!filmExists) return null;

    return this.deleteImageInDocument(params.id, params.name, model);
  }
}
