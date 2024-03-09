import { base64decode } from "nodejs-base64";
import { UserDTO, BaseUserDTO } from "./user.dto";
import { Context } from "koa";
import { User, UserRoles } from "./user.entity";
import { DI } from "../../main";
import { Not } from "typeorm";

export const signIn = async (context: Context) => {
  await DI.user
    .findOneOrFail({
      select: {
        currentSection: {
          id: true
        }
      },
      where: {
        username: context.request.body.login,
        password: context.request.body.password,
      },
      relations: {
        currentSection: true
      }
    })
    .then((user) => {
      context.response.body = new UserDTO(user);
    })
    .catch((e) => {
      console.log(e)
      context.response.status = 403;
      context.response.body = { error: "Неверный логин/пароль" };
    });
};

export const signUp = async (context: Context) => {

  const existedUser = await DI.user.findOneBy({ username: context.request.body.login, })
  if (existedUser) {
    context.response.status = 400;
    context.response.body = {
      error: "Пользователь с таким ником уже существует",
    };
  } else {
    const user = DI.user.create({
      username: context.request.body.login,
      password: context.request.body.password,
    });
    await DI.user.save(user)
    context.response.body = new UserDTO(user);
  }
};

export const getUserByToken = async (context: Context) => {
  const token = context.params.token;
  const decodedToken = base64decode(token);
  const [username, password] = decodedToken.split(":");
  await DI.user
    .findOneOrFail({
      select: {
        currentSection: {
          id: true
        }
      },
      where: {
        username,
        password,
      },
      relations: {
        currentSection: true
      }

    })
    .then((user) => {
      context.response.body = new UserDTO(user);
    })
    .catch((e) => {
      context.response.status = 403;
      context.response.body = { error: "Доступ запрещен" };
    });
};

export const postChangeSection = async (context: Context) => {
  let user = context.state.user as User;

  DI.user.update(user.id, { currentSection: context.request.body.sectionId })

  context.response.body = { ok: true }
}

// adm

export const getAdmUsers = async (context: Context) => {
  const users = await DI.user.find({
    where: { role: Not(UserRoles.ADMIN) },
  });
  context.response.body = users.map((u) => new BaseUserDTO(u));
};
