import { ApiProperty } from '@nestjs/swagger';
import Paginated from 'src/type/paginated';
import UserModel from 'src/user/infrastructure/repository/user-model';

export default class GetAllUserResponse implements Paginated<UserModel> {
  @ApiProperty({
    type: [UserModel],
  })
  data: UserModel[];
  @ApiProperty()
  total: number;
  @ApiProperty()
  totalPages: number;
  @ApiProperty()
  page: number;
  @ApiProperty()
  size: number;
}

export class UserLoginResponse {
  @ApiProperty()
  token: string;
  @ApiProperty()
  userData: UserModel;
}
