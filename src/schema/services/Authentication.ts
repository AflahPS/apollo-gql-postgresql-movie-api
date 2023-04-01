import * as argon from "argon2";
// import User from "../../models/User";
import UserModel from "../../models/User";

interface signupDto {
  username: string;
  email: string;
  password: string;
}

export const Authentication = {
  signup: async (_: any, body: any) => {
    try {
      body.password = await argon.hash(body.password);
      const user = await UserModel.create(body);
      if (user) return user;
    } catch (err) {
      console.log(err);
    }
  },
  signin: () => {
    return "signin";
  },
  changePassword: () => {
    return "changePassword";
  },
  users: () => UserModel.findAll(),
};
