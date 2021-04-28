import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Book, BookDocument } from './book.entity';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async findByID(id: string | ObjectId): Promise<Book> {
    return this.bookModel.findById(id).exec();
  }

  async findByTitle(title: string): Promise<Book> {
    return this.bookModel.findOne({ title }).exec();
  }

  async findByMultipleIDs(bookIDs: string[] | ObjectId[]): Promise<Book[]> {
    // Currently, there is an issue with Typescript on the .map() method
    // with union or array types (see: https://github.com/microsoft/TypeScript/issues/36390)
    // The workaround is to cast the array of IDs to 'any[]' to use .map()
    return this.bookModel
      .find({ _id: { $in: bookIDs } })
      .exec()
      .then((unorderedBooks) =>
        (bookIDs as any[]).map((id) =>
          unorderedBooks.find((book) => book.id === String(id)),
        ),
      );
  }
}
