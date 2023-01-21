import { ApolloError } from 'apollo-server-errors';
import bcrypt from 'bcrypt';
import {
  CreateUserInput,
  LoginInput,
  UserContext,
  UserModel,
} from '../schema/user.schema';
import Context from '../types/context';
import { signJwt } from '../utils/jwt';

class UserService {
  async createUser(input: CreateUserInput) {
    return UserModel.create(input);
  }

  async login(input: LoginInput, context: Context) {
    const e = 'Invalid email or password';

    const user = await UserModel.find().findByEmail(input.email).lean();

    if (!user) {
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
    const user = await UserModel.findById(id).lean();

    if (!user) {
      return this.logout(context);
    }

    return user;
  }
}

export default UserService;
