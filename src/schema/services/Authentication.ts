import * as argon from "argon2";
import { UserModel } from "../../models";
import { Payload, signToken, verifyToken } from "../../utils/jwt";
import { thrower } from "../../utils/errorThrower";
import { GraphQLError } from "graphql";

type signupDto = {
  username: string;
  email: string;
  password: string;
};

type signinDto = {
  email: string;
  password: string;
};

type changePasswordDto = {
  email: string;
  oldPassword: string;
  newPassword: string;
};

export const Authentication = {
  signup: async (_: undefined, args: signupDto) => {
    try {
      args.password = await argon.hash(args.password);
      const user = await UserModel.create(args);
      if (user) {
        const token = signToken({
          id: user.id,
          password: user.password,
          email: user.email,
        });
        Object.assign(user, { token });
        return user;
      }
    } catch (err) {
      thrower(err);
    }
  },
  signin: async (_: undefined, args: signinDto) => {
    try {
      const user = await UserModel.findOne({ where: { email: args.email } });
      if (!user) {
        throw new GraphQLError(`Authentication failed !`);
      }
      const isMatch = await argon.verify(user.password, args.password);
      if (!isMatch) {
        throw new GraphQLError(`Authentication failed!`);
      }
      const token = signToken({
        id: user.id,
        password: user.password,
        email: user.email,
      });
      Object.assign(user, { token });
      return user;
    } catch (err) {
      thrower(err);
    }
  },
  changePassword: async (_: undefined, args: changePasswordDto) => {
    try {
      const user = await UserModel.findOne({ where: { email: args.email } });
      if (!user) {
        throw new GraphQLError(`Authentication failed !`);
      }
      const isMatch = await argon.verify(user.password, args.oldPassword);
      if (!isMatch) {
        throw new GraphQLError(`Authentication failed!`);
      }
      const hashed = await argon.hash(args.newPassword);
      user.password = hashed;
      const updatedUser = await user.save();
      const token = signToken({
        id: updatedUser.id,
        password: updatedUser.password,
        email: updatedUser.email,
      });
      Object.assign(updatedUser, { token });
      return updatedUser;
    } catch (err) {
      thrower(err);
    }
  },
  getUser: async (bearerToken: string) => {
    try {
      if (!bearerToken) return null;
      const token = bearerToken.split(" ")[1];
      const payload = verifyToken(token);
      const user = await UserModel.findByPk((payload as Payload)?.id);

      if (!user || user.password !== (payload as Payload)?.password) {
        return null;
      }
      return user;
    } catch (err) {
      console.log(err);
    }
  },
  users: () => UserModel.findAll(),
};
