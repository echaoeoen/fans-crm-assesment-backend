import { ApiProperty } from '@nestjs/swagger';
import { Column, Model, Table } from 'sequelize-typescript';

@Table
export default class UserModel extends Model {
  @ApiProperty()
  id: number;

  @ApiProperty()
  @Column
  name: string;

  @Column
  @ApiProperty()
  email: string;

  @Column
  password: string;

  @Column
  @ApiProperty()
  phone: string;
}
