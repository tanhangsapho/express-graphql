import { injectable } from "tsyringe";
import { UserModel } from "../models/user.model";
import { IUser } from "../../types/auth.type";

@injectable()
export class UserRepo {
  async findAll() {
    return UserModel.find();
  }

  async findById(id: string) {
    return UserModel.findById(id);
  }

  async findByEmail(email: string) {
    return UserModel.findOne({ email });
  }

  async create(useData: IUser) {
    return UserModel.create(useData);
  }
}
