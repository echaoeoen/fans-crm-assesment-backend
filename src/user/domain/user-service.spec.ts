import { Test, TestingModule } from '@nestjs/testing';
import UserService from './user-service';
import UserRepository from '../infrastructure/repository/user-repository';
import UserModel from '../infrastructure/repository/user-model';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { PropertyOnly } from 'src/type/property';
import { GetUserRequest } from '../application/controller/user-request';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: {
            save: jest.fn(),
            findAll: jest.fn(),
            findByPassword: jest.fn(),
            model: { findOne: jest.fn() },
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            verify: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('addUser', () => {
    it('should call userRepository.save with correct parameters', async () => {
      const user: PropertyOnly<UserModel> = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
      };
      await userService.addUser(user);
      expect(userRepository.save).toHaveBeenCalledWith(user);
    });
  });

  describe('findAll', () => {
    it('should call userRepository.findAll with correct parameters', async () => {
      const request = { name: 'John Doe', page: 1, size: 10 } as GetUserRequest;
      await userService.findAll(request);
      expect(userRepository.findAll).toHaveBeenCalledWith(
        request,
        request.name,
      );
    });
  });

  describe('login', () => {
    it('should return a token for valid credentials', async () => {
      const email = 'john@example.com';
      const password = 'password';
      const userData = { id: 1, email } as UserModel;

      jest.spyOn(userRepository, 'findByPassword').mockResolvedValue(userData);
      jest.spyOn(jwtService, 'sign').mockReturnValue('valid_token');

      const result = await userService.login(email, password);

      expect(result).toEqual({ token: 'valid_token' });
      expect(userRepository.findByPassword).toHaveBeenCalledWith(
        email,
        password,
      );
      expect(jwtService.sign).toHaveBeenCalledWith({ id: userData.id });
    });

    it('should throw UnauthorizedException for invalid credentials', async () => {
      jest.spyOn(userRepository, 'findByPassword').mockResolvedValue(null);

      await expect(
        userService.login('invalid@example.com', 'wrongpassword'),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('verify', () => {
    it('should return user data for a valid token', async () => {
      const token = 'valid_token';
      const decoded = { id: 1 };
      const user = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
      } as UserModel;

      jest.spyOn(jwtService, 'verify').mockReturnValue(decoded);
      jest.spyOn(userRepository.model, 'findOne').mockResolvedValue(user);

      const result = await userService.verify(token);

      expect(result).toEqual(user);
      expect(jwtService.verify).toHaveBeenCalledWith(token);
      expect(userRepository.model.findOne).toHaveBeenCalledWith(decoded.id);
    });

    it('should throw UnauthorizedException for an invalid token', async () => {
      jest.spyOn(jwtService, 'verify').mockImplementation(() => {
        throw new UnauthorizedException('Invalid token');
      });

      await expect(userService.verify('invalid_token')).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
