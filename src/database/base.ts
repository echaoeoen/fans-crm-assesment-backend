import { WhereOptions } from 'sequelize';
import { Model, ModelCtor } from 'sequelize-typescript';
import Pagination from 'src/type/pagination';
import { PropertyOnly } from 'src/type/property';

export class BaseRepository<M extends Model<M>> {
  constructor(
    public model: ModelCtor<M>,
    private modelType: new () => M,
  ) {}

  async save(data: PropertyOnly<M>) {
    const instance = new this.modelType();
    Object.assign(instance, data);
    await instance.save();
  }

  async getPaginated(
    param: Pagination,
    opt: { scope?: string; where?: WhereOptions<M> } = {},
  ) {
    const { page, size } = param;
    const where = opt.where;
    const m = opt.scope ? this.model.scope(opt.scope) : this.model;
    const data = await m.findAll({
      limit: size,
      offset: (page - 1) * size,
      where: where,
    });
    const total = await m.count({
      where: where,
    });
    return {
      data,
      total,
      totalPages: Math.ceil(total / size),
      page,
      size,
    };
  }
}
