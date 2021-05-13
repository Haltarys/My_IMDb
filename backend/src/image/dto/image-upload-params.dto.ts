import { IsEnum, IsMongoId } from 'class-validator';
import { IsCoherentImageName } from '../decorators/is-coherent-image-name.decorator';
import { ImageCategory } from '../enums/image-category.enum';
import { ImageName } from '../enums/image-name.enum';

export class ImageUploadParams {
  @IsEnum(ImageCategory)
  category: ImageCategory;

  @IsMongoId()
  id: string;

  @IsEnum(ImageName)
  @IsCoherentImageName()
  name: ImageName;
}
