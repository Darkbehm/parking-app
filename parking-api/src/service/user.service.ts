import { ApolloError } from 'apollo-server-errors';
import bcrypt from 'bcrypt';
import {
  CreateUserInput,
  LoginInput,
  UpdateUserInput,
  UserContext,
  UserModel,
} from '../schema/user.schema';
import Context from '../types/context';
import { signJwt } from '../utils/jwt';
import { GraphQLError } from 'graphql';

class UserService {
  async createUser(input: CreateUserInput, context: Context) {
    return UserModel.create(input).then((user) => {
      return this.login(
        {
          email: user.email,
          password: input.password,
        },
        context,
      );
    });
  }

  async login(input: LoginInput, context: Context) {
    const e = 'Invalid email or password';

    const user = await UserModel.find().findByEmail(input.email).lean();

    if (!user || !user.isActive) {
      throw new ApolloError(e);
    }

    const passwordIsValid = await bcrypt.compare(input.password, user.password);

    if (!passwordIsValid) {
      throw new ApolloError(e);
    }

    const signObj: UserContext = {
      id: user._id,
      role: user.isAdmin ? 'ADMIN' : 'USER',
    };

    const token = signJwt(signObj);

    context.res.cookie('accessToken', token, {
      maxAge: 3.154e10,
      httpOnly: true,
      domain: 'localhost',
      path: '/',
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });

    return token;
  }

  async logout(context: Context) {
    context.res.clearCookie('accessToken', {
      domain: 'localhost',
      path: '/',
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });
    return true;
  }

  async findUserById(id: string) {
    return UserModel.findById(id).lean();
  }

  async getCurrentUser(context: Context) {
    if (!context.user) {
      return null;
    }
    const { id } = context.user;

    if (!id) {
      return null;
    }
    const user = await UserModel.findOne({
      _id: id,
      isActive: true,
    }).lean();

    if (!user) {
      return this.logout(context);
    }

    return user;
  }

  async updateUser(id: string, input: UpdateUserInput) {
    return UserModel.findByIdAndUpdate
      .bind(UserModel)(id, input, { new: true })
      .lean();
  }

  async deleteUser(id: string) {
    const user = await UserModel.findOne({ _id: id, isActive: true }).lean();

    if (!user) {
      throw new GraphQLError('User not found', {
        extensions: {
          code: 'USER_NOT_FOUND',
        },
      });
    }

    const deletedUser = {
      ...user,
      updatedAt: new Date(),
      isActive: false,
    };

    return UserModel.findOneAndUpdate({ _id: id }, deletedUser, {
      new: true,
    }).lean();
  }

  async findUsers() {
    return UserModel.find({
      isActive: true,
    }).lean();
  }
}

export default UserService;
