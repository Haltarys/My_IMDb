import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Book, BookDocument } from './book.entity';
import { mapOrder } from 'src/utils/mapOrder';

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
    return this.bookModel
      .find({ _id: { $in: bookIDs } })
      .exec()
      .then((unorderedBooks) => mapOrder(unorderedBooks, bookIDs));
  }
}
