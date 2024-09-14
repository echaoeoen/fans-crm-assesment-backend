import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { BaseRepository } from 'src/database/base';
import UserModel from './user-model';
import { InjectModel } from '@nestjs/sequelize';
import Pagination from 'src/type/pagination';
import { Op, WhereOptions } from 'sequelize';
import { PropertyOnly } from 'src/type/property';
import hash from 'src/utils/hash';

@Injectable()
export default class UserRepository
  extends BaseRepository<UserModel>
  implements OnApplicationBootstrap
{
  async onApplicationBootstrap() {
    // init default admin user
    const admin = await this.userModel.findOne({
      where: { email: 'admin@mail.com' },
    });
    if (!admin)
      this.save({
        email: 'admin@mail.com',
        password: 'password123',
        name: 'Admin Test',
      });
  }
  constructor(@InjectModel(UserModel) protected userModel: typeof UserModel) {
    UserModel.addScope('withoutPassword', {
      attributes: { exclude: ['password'] },
    });
    super(userModel, UserModel);
  }

  async findAll(param: Pagination, name?: string) {
    const where: WhereOptions<UserModel> = {};
    if (name) {
      where.name = {
        [Op.like]: `%${name}%`,
      };
    }
    return this.getPaginated(param, {
      where,
      scope: 'withoutPassword',
    });
  }

  async findByPassword(email: string, password: string) {
    const user = await this.userModel.findOne({
      where: { email, password: hash(password) },
    });
    return user;
  }
  async save(data: PropertyOnly<UserModel>) {
    data.password = hash(data.password);
    return super.save(data);
  }
}
