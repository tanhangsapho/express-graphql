import { container } from "tsyringe";
import { UserController } from "../controller/user.controller";
import { ILogin, IRegister } from "../types/auth.type";

const userController = container.resolve(UserController);

export const userResolvers = {
  Query: {
    users: async () => {
      return userController.getUsers();
    },
  },
  Mutation: {
    registerUser: async (_: any, { input }: { input: IRegister }) => {
      return userController.registerUser(input);
    },
    loginUser: async (_: any, { input }: { input: ILogin }) => {
      return userController.loginUser(input);
    },
  },
};
