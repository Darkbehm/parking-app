import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import {
  CreateUserInput,
  LoginInput,
  User,
  UpdateUserInput,
} from '../schema/user.schema';
import UserService from '../service/user.service';
import Context from '../types/context';

@Resolver()
export default class UserResolver {
  constructor(private userService: UserService) {
    this.userService = new UserService();
  }

  @Mutation(() => String)
  createUser(@Arg('input') input: CreateUserInput, @Ctx() context: Context) {
    return this.userService.createUser(input, context);
  }

  @Mutation(() => String)
  login(@Arg('input') input: LoginInput, @Ctx() context: Context) {
    return this.userService.login(input, context);
  }

  @Mutation(() => Boolean)
  logout(@Ctx() context: Context) {
    return this.userService.logout(context);
  }

  @Authorized()
  @Query(() => User, { nullable: true })
  async me(@Ctx() context: Context) {
    return this.userService.getCurrentUser(context);
  }

  @Authorized()
  @Query(() => User)
  findUserById(@Arg('id') id: string) {
    return this.userService.findUserById(id);
  }

  @Authorized('ADMIN')
  @Query(() => [User])
  users() {
    return this.userService.findUsers();
  }

  @Authorized('ADMIN')
  @Mutation(() => User)
  updateUser(@Arg('id') id: string, @Arg('input') input: UpdateUserInput) {
    return this.userService.updateUser(id, input);
  }

  @Authorized('ADMIN')
  @Mutation(() => User)
  deleteUser(@Arg('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
