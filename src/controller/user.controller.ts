import { inject, injectable } from "tsyringe";
import { UserService } from "../service/user.service";
import { ILogin, IRegister, IUser } from "../types/auth.type";

@injectable()
export class UserController {
  constructor(@inject(UserService) private readonly userService: UserService) {}
  async getUsers() {
    // Fetch all users using the service
    return this.userService.getUsers();
  }

  async registerUser(userRegister: IRegister) {
    // Handle user registration
    return this.userService.registerUser(userRegister);
  }

  async loginUser(users: ILogin) {
    // Handle user login
    return this.userService.loginUser(users);
  }
}
