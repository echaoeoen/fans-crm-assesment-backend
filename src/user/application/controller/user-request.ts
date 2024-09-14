import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import Pagination from 'src/type/pagination';

export class UserRequest {
  @ApiProperty({
    example: 'johndoe@mail.com',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'John Doe',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: '+6281234567890',
  })
  @IsString()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({
    example: 'password',
  })
  @IsString()
  password: string;
}

export class GetUserRequest extends Pagination {
  @ApiProperty({
    example: 'John Doe',
    required: false,
  })
  @IsOptional()
  @IsString()
  name: string;
}

export class UserLoginRequest {
  @ApiProperty({
    example: 'johndoe@mail.com',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password',
  })
  @IsString()
  password: string;
}
