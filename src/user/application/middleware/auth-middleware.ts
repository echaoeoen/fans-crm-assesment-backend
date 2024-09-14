import { Injectable } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import UserService from 'src/user/domain/user-service';
@Injectable()
export default class AuthMiddleware {
  constructor(private userService: UserService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const user = await this.userService.verify(token);
      req.user = user;
      next();
    } catch (e) {
      res.status(401).json({ message: 'Unauthorized' });
    }
  }
}
