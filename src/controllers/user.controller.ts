import { User } from '@prisma/client';
import { successResponse, serverErrorResponse, notFoundResponse } from "./../utils/api.response";
import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
  private userService = new UserService();

  public async createUser(req: Request, res: Response) {
    try {
        let user = req.body as User
      const token = await this.userService.saveUser(user);

      return successResponse("User created", { token }, res);
    } catch (error: any) {
      return serverErrorResponse(error, res);
    }
  }

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const token = await this.userService.login(email, password);
      let obj = {
        token,
      };
      return successResponse("User logged in successfully", obj, res);
    } catch (error) {
      return serverErrorResponse(error, res);
    }
  }

  public async getProfile(req: any, res: Response) {
    const userId = req.user.id;
    try {
      const user = await this.userService.getUserProfile(userId);
      if (!user) 
        return notFoundResponse("id",userId,"User",res);
      return successResponse("User profile", user, res);
    } catch (error) {
      return serverErrorResponse(error, res);
    }
  }
}
