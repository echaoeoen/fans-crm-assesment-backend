import { Test, TestingModule } from '@nestjs/testing';
import UserController from './user-controller';
import UserService from 'src/user/domain/user-service';
import { GetUserRequest, UserLoginRequest, UserRequest } from './user-request';
import GetAllUserResponse, { UserLoginResponse } from './user-response';
import UserModel from 'src/user/infrastructure/repository/user-model';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            addUser: jest.fn(),
            findAll: jest.fn(),
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('createUser', () => {
    it('should call userService.addUser with the correct parameters', async () => {
      const userRequest = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password',
      } as UserRequest;
      await userController.createUser(userRequest);
      expect(userService.addUser).toHaveBeenCalledWith(userRequest);
    });
  });

  describe('getUsers', () => {
    it('should call userService.findAll with the correct parameters', async () => {
      const getUserRequest: GetUserRequest = {
        name: 'John Doe',
      } as GetUserRequest;
      const userList: GetAllUserResponse = { data: [] } as GetAllUserResponse; // Mocked response
      jest.spyOn(userService, 'findAll').mockResolvedValue(userList);

      const result = await userController.getUsers(getUserRequest);
      expect(userService.findAll).toHaveBeenCalledWith(getUserRequest);
      expect(result).toBe(userList);
    });
  });

  describe('login', () => {
    it('should call userService.login with the correct parameters and return a token', async () => {
      const loginRequest: UserLoginRequest = {
        email: 'john@example.com',
        password: 'password',
      };
      const loginResponse: UserLoginResponse = {
        token: 'valid_token',
        userData: {
          email: 'john@example.com',
          id: 1,
        } as UserModel,
      }; // Mocked response
      jest.spyOn(userService, 'login').mockResolvedValue(loginResponse);

      const result = await userController.login(loginRequest);
      expect(userService.login).toHaveBeenCalledWith(
        loginRequest.email,
        loginRequest.password,
      );
      expect(result).toBe(loginResponse);
    });
  });
});
