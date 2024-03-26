import { base64decode } from "nodejs-base64";
import { UserRoles } from "../entities/user.entity";
import { DI } from "../entities";
import { specFactory } from "../route-state";
import { z } from "zod";

export const authMiddleware = (forUserRoles: UserRoles[]) => specFactory.createUseSpec({
  handler: async (ctx, next) => {
    const token = ctx.header["token"] as string;
      try {
        const decodedToken = base64decode(token);
        const [username, password] = decodedToken.split(":");

        const user = await DI.user.findOne({ where: { username, password }, loadRelationIds: true });

        if (user && forUserRoles.includes(user.role || UserRoles.USER)) {
          ctx.state.user = user;
          await next();
          ctx.state.user = null;
        } else {
          ctx.response.status = 401;
          ctx.response.body = { error: "Нет доступа" };
        }
      } catch (e: any) {
        console.log(e);
        ctx.response.status = 500;
        ctx.response.body = { error: e.message || e };
      }
  },
  validate: {
    // validation fails if `token` is not set in the HTTP request headers
    headers: z.object({ 'token': z.string() }),
  },
});