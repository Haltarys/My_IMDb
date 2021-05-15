import {
  BadRequestException,
  Controller,
  Delete,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Film } from 'src/graphql/media/film/film.entity';
import { Person } from 'src/graphql/person/person.entity';
import { Universe } from 'src/graphql/universe/universe.entity';
import { ImageUploadParams } from './dto/image-upload-params.dto';
import { ImageService } from './image.service';
import { ValidImageInterceptor } from './interceptors/valid-image.interceptor';

@Controller('images/upload')
export class ImageController {
  constructor(private imageService: ImageService) {}

  @Post(':category/:id/:name')
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('file'), ValidImageInterceptor)
  async uploadImage(
    @Param() params: ImageUploadParams,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Person | Film | Universe> {
    const film = await this.imageService.uploadImage(params, file);

    if (film) return film;
    throw new BadRequestException(
      `Error: no document with id ${params.id} found in '${params.category}'.`,
    );
  }

  @Delete(':category/:id/:name')
  @UsePipes(ValidationPipe)
  async deleteImage(
    @Param() params: ImageUploadParams,
  ): Promise<Person | Film | Universe> {
    const film = await this.imageService.deleteImage(params);

    if (film) return film;
    throw new BadRequestException(
      `Error: no document with id ${params.id} found in '${params.category}'.`,
    );
  }
}
