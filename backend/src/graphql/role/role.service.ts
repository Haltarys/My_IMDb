import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Role, RoleDocument } from './role.entity';
import { mapOrder } from 'src/utils/mapOrder';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}

  async findAll(): Promise<Role[]> {
    return this.roleModel.find().exec();
  }

  async findByID(id: string | ObjectId): Promise<Role> {
    return this.roleModel.findById(id).exec();
  }

  async findByMultipleIDs(roleIDs: string[] | ObjectId[]): Promise<Role[]> {
    return this.roleModel
      .find({ _id: { $in: roleIDs } })
      .exec()
      .then((unorderedRoles) => mapOrder(unorderedRoles, roleIDs));
  }
}
