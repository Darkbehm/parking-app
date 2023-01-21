import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { CreateUserInput, LoginInput, User } from "../schema/user.schema";
import UserService from "../service/user.service";
import Context from "../types/context";

@Resolver()
export default class UserResolver {
  constructor(private userService: UserService) {
    this.userService = new UserService();
  }

  @Mutation(() => User)
  createUser(@Arg("input") input: CreateUserInput) {
    return this.userService.createUser(input);
  }

  @Mutation(() => String)
  login(@Arg("input") input: LoginInput, @Ctx() context: Context) {
    return this.userService.login(input, context);
  }

  @Mutation(() => Boolean)
  logout(@Ctx() context: Context) {
    return this.userService.logout(context);
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() context: Context) {
    if (!context.user) {
      return null;
    }
    const { id } = context.user;

    if (!id) {
      return null;
    }
    const user = await this.userService.findUserById(id);

    if (!user) {
      return this.userService.logout(context);
    }

    return user;
  }

  @Query(() => User)
  findUserById(@Arg("id") id: string) {
    return this.userService.findUserById(id);
  }
}
