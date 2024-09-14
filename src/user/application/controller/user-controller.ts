import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import UserService from 'src/user/domain/user-service';
import { GetUserRequest, UserLoginRequest, UserRequest } from './user-request';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import GetAllUserResponse, { UserLoginResponse } from './user-response';
@Controller()
export default class UserController {
  constructor(private userService: UserService) {}

  @Post('/v1/users')
  @ApiBearerAuth()
  async createUser(@Body() request: UserRequest) {
    await this.userService.addUser(request);
  }

  @Get('/v1/users')
  @ApiBearerAuth()
  @ApiResponse({
    type: GetAllUserResponse,
  })
  async getUsers(@Query() request: GetUserRequest) {
    return await this.userService.findAll(request);
  }
  @Post('/v1/login')
  @ApiResponse({
    type: UserLoginResponse,
  })
  async login(@Body() request: UserLoginRequest): Promise<UserLoginResponse> {
    return await this.userService.login(request.email, request.password);
  }
}
