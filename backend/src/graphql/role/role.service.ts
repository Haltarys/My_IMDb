import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Role, RoleDocument } from './role.schema';
import { IDType } from '../id-type';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}

  async findAllRoles(): Promise<Role[]> {
    const roles = await this.roleModel.find().exec();

    return roles;
  }

  async findRoleByID(id: IDType | ObjectId): Promise<Role> {
    const role = await this.roleModel.findById(id).exec();

    return role;
  }

  async findRolesWithIDs(roleIDs: IDType[] | ObjectId[]): Promise<Role[]> {
    // Currently, there is an issue with Typescript on the .map() method
    // with union or array types (see: https://github.com/microsoft/TypeScript/issues/36390)
    // The workaround is to cast the array of IDs to 'any[]' to use .map()

    const roles = await this.roleModel
      .find({ _id: { $in: roleIDs } })
      .exec()
      .then((unorderedRoles) =>
        (roleIDs as any[]).map((id) =>
          unorderedRoles.find((role) => role.id === String(id)),
        ),
      );

    return roles;
  }
}
