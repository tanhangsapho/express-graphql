export interface IUser {
  name: string;
  email: string;
  password: string;
  roles: string[];
  lastLogin?: Date;
}

export interface ILogin {
  email: string;
  password: string;
  roles: string[];
}
export interface IRegister {
  name: string;
  email: string;
  password: string;
  roles: string[];
}
