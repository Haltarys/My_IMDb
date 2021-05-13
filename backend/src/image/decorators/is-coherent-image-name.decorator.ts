import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  isEnum,
} from 'class-validator';
import { ImageUploadParams } from '../dto/image-upload-params.dto';
import { ImageCategory } from '../enums/image-category.enum';
import { ImageName } from '../enums/image-name.enum';

export function IsCoherentImageName(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isCoherentImageName',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments): boolean {
          if (!isEnum(value, ImageName)) return false;

          const category = (args.object as ImageUploadParams).category;
          if (!isEnum(category, ImageCategory)) return false;

          switch (category) {
            case ImageCategory.PEOPLE:
              return value === ImageName.PORTRAIT;

            case ImageCategory.FILMS:
              return (
                value === ImageName.POSTER || value === ImageName.WALLPAPER
              );

            case ImageCategory.UNIVERSES:
              return value === ImageName.WALLPAPER;

            default:
              return false;
          }
        },
      },
    });
  };
}
