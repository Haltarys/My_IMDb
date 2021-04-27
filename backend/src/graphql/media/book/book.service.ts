import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Book, BookDocument } from './book.entity';
import { IDType } from 'src/graphql/id-type';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async findAllBooks(): Promise<Book[]> {
    const books = await this.bookModel.find().exec();

    return books;
  }

  async findBookByID(id: IDType | ObjectId): Promise<Book> {
    const book = await this.bookModel.findById(id).exec();

    return book;
  }

  async findBookByTitle(title: string): Promise<Book> {
    const book = await this.bookModel.findOne({ title }).exec();

    return book;
  }

  async findBooksWithIDs(bookIDs: IDType[] | ObjectId[]): Promise<Book[]> {
    // Currently, there is an issue with Typescript on the .map() method
    // with union or array types (see: https://github.com/microsoft/TypeScript/issues/36390)
    // The workaround is to cast the array of IDs to 'any[]' to use .map()

    const books = await this.bookModel
      .find({ _id: { $in: bookIDs } })
      .exec()
      .then((unorderedBooks) =>
        (bookIDs as any[]).map((id) =>
          unorderedBooks.find((book) => book.id === String(id)),
        ),
      );

    return books;
  }
}
