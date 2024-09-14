import { Injectable, UnauthorizedException } from '@nestjs/common';
import UserRepository from '../infrastructure/repository/user-repository';
import UserModel from '../infrastructure/repository/user-model';
import { PropertyOnly } from 'src/type/property';
import { GetUserRequest } from '../application/controller/user-request';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export default class UserService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async addUser(user: PropertyOnly<UserModel>) {
    await this.userRepository.save(user);
  }

  async findAll(request: GetUserRequest) {
    return await this.userRepository.findAll(request, request.name);
  }

  async login(email: string, password: string) {
    const userData = await this.userRepository.findByPassword(email, password);
    if (userData) {
      const token = this.jwtService.sign({ id: userData.id });
      return { token, userData };
    }
    throw new UnauthorizedException(`Invalid email or password`);
  }

  async verify(token: string) {
    const decoded = this.jwtService.verify(token);
    if (decoded) {
      return await this.userRepository.model.findOne(decoded.id);
    }
    throw new UnauthorizedException(`Invalid token`);
  }
}
