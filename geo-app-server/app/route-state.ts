import { routerSpecFactory } from "koa-zod-router";
import { User } from "./entities/user.entity";

export type UserState = {
  user: User
};

export const specFactory = routerSpecFactory<UserState>();