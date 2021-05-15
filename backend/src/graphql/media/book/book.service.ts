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

  async findById(id: string | ObjectId): Promise<Book> {
    return this.bookModel.findById(id).exec();
  }

  async findByTitle(title: string): Promise<Book> {
    return this.bookModel.findOne({ title }).exec();
  }

  async findByMultipleIds(ids: string[] | ObjectId[]): Promise<Book[]> {
    return this.bookModel
      .find({ _id: { $in: ids } })
      .exec()
      .then((unorderedBooks) => mapOrder(unorderedBooks, ids));
  }
}
