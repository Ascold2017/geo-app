import {
  Body,
  Controller,
  Get,
  Params,
  Post,
  Response,
} from "@decorators/express";
import { AuthService } from "../services/auth.service";

@Controller("/auth")
export class AuthController {
  constructor(private authService = new AuthService()) {}

  @Post("/sign-in")
  async signIn(
    @Response() res,
    @Body() body: { login: string; password: string }
  ) {
    const { login, password } = body;
    try {
      const user = await this.authService.signIn(login, password);
      res.status(200).json(user);
    } catch (e) {
      console.log(e);
      res.status(403).json({ error: "Неверный логин/пароль" });
    }
  }

  @Post("/sign-up")
  async signUp(
    @Response() res,
    @Body() body: { login: string; password: string }
  ) {
    const { login, password } = body;
    try {
      const user = await this.authService.signUp(login, password);
      res.status(200).json(user);
    } catch (e) {
      console.log(e);
      res
        .status(400)
        .json({ error: "Пользователь с таким ником уже существует" });
    }
  }

  @Get("/:token")
  async getUserByToken(@Response() res, @Params("token") token: string) {
    try {
      const user = await this.authService.verifyToken(token);
      res.status(200).json(user);
    } catch (e) {
      console.log(e);
      res.status(403).json({ error: "Доступ запрещен" });
    }
  }
}
