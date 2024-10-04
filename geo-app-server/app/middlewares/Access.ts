import { base64decode } from "nodejs-base64";
import { UserRoles } from "../entities/user.entity";
import { DI } from "../config/data-source";
import { attachMiddleware } from "@decorators/express";
import { NextFunction, Request, Response } from "express";

export function Access(forUserRoles: UserRoles[]) {
  return function (
    target: any,
    properyKey: string,
    descriptor: PropertyDescriptor
  ) {
    attachMiddleware(
      target,
      properyKey,
      async (req: Request, res: Response, next: NextFunction) => {
        const token = req.header("token") as string;
        try {
          const decodedToken = base64decode(token);
          const [username, password] = decodedToken.split(":");

          const user = await DI.user.findOne({
            where: { username, password },
            loadRelationIds: true,
          });

          if (user && forUserRoles.includes(user.role || UserRoles.USER)) {
            // @ts-ignore
            req.state = { user };
            next();
          } else {
            res.status(401).json({ error: "Нет доступа" });
          }
        } catch (e: any) {
          console.log(e);
          res.status(500).json({ error: e.message || e });
        }
      }
    );
  };
}
