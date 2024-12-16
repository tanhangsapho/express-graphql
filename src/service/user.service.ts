import { inject, injectable } from "tsyringe";
import { UserRepo } from "../database/repository/user.repo";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt";
import { ILogin, IRegister } from "../types/auth.type";

@injectable()
export class UserService {
  constructor(
    @inject(UserRepo)
    private readonly userRepository: UserRepo
  ) {}
  async getUsers() {
    // Fetch all users using the service
    return this.userRepository.findAll();
  }

  async registerUser(userRegister: IRegister) {
    return this.userRepository.create(userRegister);
  }

  async loginUser(userLogin: ILogin) {
    const user = await this.userRepository.findByEmail(userLogin.email);
    if (!user) throw new Error("Invalid email or password");

    const isMatch = await bcrypt.compare(userLogin.password, user.password);
    if (!isMatch) throw new Error("Invalid email or password");

    // Generate JWT
    const token = generateToken({ id: user._id, roles: user.roles });
    return { token, user };
  }
}
