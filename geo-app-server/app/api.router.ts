import Router from "koa-router";
import userRouter from "./user/user.router";
import pushRouter from "./push/push.router";
import sectionRouter from "./section/section.router";
import authMiddleware from "../middlewares/authMiddleware";
import { UserRoles } from "./user/user.entity";
import { DI } from "../main";

const apiUnprotectedRouter = new Router({ prefix: "/api" });
const apiUserRouter = new Router({ prefix: "/api" });
const apiAdmRouter = new Router({ prefix: "/api/adm" });
const apiIntRouter = new Router({ prefix: "/api/int" });

apiUserRouter.use(authMiddleware([UserRoles.USER]));
apiAdmRouter.use(authMiddleware([UserRoles.ADMIN]));

// unprotected routes
apiUnprotectedRouter.use(pushRouter.unprotectedRouter.routes());
apiUnprotectedRouter.use(userRouter.unprotectedRouter.routes());

// user routes
apiUserRouter.use(pushRouter.userRouter.routes());
apiUserRouter.use(userRouter.userRouter.routes());
apiUserRouter.use(sectionRouter.userRouter.routes());

// adm routes
apiAdmRouter.use(userRouter.adminRouter.routes());
apiAdmRouter.use(sectionRouter.admRouter.routes());

// int routes
apiIntRouter.get('/db-tables', async context => {
  const data = await Promise.all(DI.em.connection.entityMetadatas.map(async em => {
    const rowsCount = await DI.em.count(em.name);
    return {
      name: em.name,
      columns: em.columns.map(col => ({ name: col.propertyName, type: col.type })),
      rowsCount: rowsCount
    }
  }));

  context.response.body = data;

})

apiIntRouter.get('/db-tables/:table', async context => {

  const entityName = context.params.table;

  const data = await DI.em.find(entityName, { loadRelationIds: true })

  context.response.body = data;

})

export default new Router()
  .use(apiUnprotectedRouter.routes())
  .use(apiAdmRouter.routes())
  .use(apiIntRouter.routes())
  .use(apiUserRouter.routes());
