import {
  Body,
  Controller,
  Get,
  Params,
  Post,
  Request,
  Response,
} from "@decorators/express";
import { Access } from "../middlewares/Access";
import { UserRoles } from "../entities/user.entity";
import { LearnService } from "../services/learn.service";
import { PushService } from "../services/push.service";
import { ProgressListDTO } from "../dto/progress.dto";

@Controller("/learn")
export class LearnController {
  constructor(
    private learnService = new LearnService(),
    private pushService = new PushService()
  ) {}

  @Access([UserRoles.USER])
  @Get("/sections")
  async getSections(@Request() req, @Response() res) {
    const sections = await this.learnService.getSections();
    res.json(sections);
  }

  @Access([UserRoles.USER])
  @Get("/topics")
  async getTopics(@Request() req, @Response() res) {
    if (!req.state.user.currentSection) {
      res.json([]);
    }
    const topics = await this.learnService.getTopicList(
      req.state.user.id,
      req.state.user.currentSection as unknown as number
    );
    res.json(topics);
  }

  @Access([UserRoles.USER])
  @Get("/topic/:id")
  async getTopicById(
    @Request() req,
    @Response() res,
    @Params("id") id: number
  ) {
    try {
      const topic = await this.learnService.getUserTopic(
        req.state.user.id,
        +id
      );
      res.json(topic);
    } catch {
      res.status(404).json({ error: "Не найден(" });
    }
  }

  @Access([UserRoles.USER])
  @Post("/change-section")
  async changeSection(
    @Request() req,
    @Response() res,
    @Body() body: { sectionId: number }
  ) {
    const { sectionId } = body;
    await this.learnService.changeUserSection(req.state.user, +sectionId);
    res.json({ ok: true });
  }

  @Access([UserRoles.USER])
  @Post("/read-task/:id")
  async readTask(@Request() req, @Response() res, @Params("id") id: number) {
    await this.learnService.checkReadedTask(req.state.user.id, +id);

    // Check is training completed
    const nextRepeat = await this.learnService.getUserNearestRepeatDate(
      req.state.user
    );
    if (nextRepeat && nextRepeat > new Date().getTime()) {
      this.pushService.uncheckRecieveNotification(req.state.user.id);
    }

    res.json({ ok: true });
  }

  @Access([UserRoles.USER])
  @Post("/complete-task/:id")
  async completeTask(
    @Request() req,
    @Response() res,
    @Params("id") id: number,
    @Body() body: { value: boolean }
  ) {
    await this.learnService.checkCompletedTask(
      req.state.user.id,
      +id,
      body.value
    );
    res.json({ ok: true });
  }

  @Access([UserRoles.USER])
  @Post("/progress")
  async progress(@Request() req, @Response() res, @Params("id") id: number) {
    const progress = await this.learnService.getProgress(
      req.state.user.id,
      req.state.user.currentSection as unknown as number
    );
    res.json(progress);
  }

  @Access([UserRoles.USER])
  @Get("/tasks-to-repeat")
  async repeat(@Request() req, @Response() res) {
    const progress = await this.learnService.getTasksToRepeat(
      req.state.user.id,
      req.state.user.currentSection as unknown as number
    );
    const nextRepeat = await this.learnService.getUserNearestRepeatDate(
      req.state.user
    );
    const data = new ProgressListDTO(progress, nextRepeat);

    res.json(data);
  }
}
