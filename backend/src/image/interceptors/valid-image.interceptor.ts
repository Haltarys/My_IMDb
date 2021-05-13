import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { unlink } from 'fs/promises';
import { Observable } from 'rxjs';
import { isValidImage } from '../utils/is-valid-image';

@Injectable()
export class ValidImageInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const file: Express.Multer.File = context.switchToHttp().getRequest().file;
    if (!file)
      throw new BadRequestException(
        "Error: missing file with a fieldname of 'file'.",
      );
    const isValid = await isValidImage(file);
    if (!isValid) {
      await unlink(file.path);
      throw new BadRequestException(
        'Error: uploaded file is not a valid image.',
      );
    }

    return next.handle();
  }
}
