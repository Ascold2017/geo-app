import { base64decode } from "nodejs-base64";
import { Context, Next } from "koa";
import { UserRoles } from "../api/user/user.entity";
import { DI } from "../main";

export default function authMiddleware(forUserRoles: UserRoles[]) {
  return async function (ctx: Context, next: Next) {
    if (ctx.request.header["token"]) {
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
    } else {
      ctx.response.status = 401;
      ctx.response.body = { error: "Нет доступа" };
    }
  };
}
