import {
  Body,
  Controller,
  Delete,
  Get,
  Params,
  Patch,
  Post,
  Response,
} from "@decorators/express";
import { AdminService } from "../services/admin.service";
import { Access } from "../middlewares/Access";
import { UserRoles } from "../entities/user.entity";
import { TaskTypes } from "../entities/task.entity";

@Controller("/adm")
export class AdminController {
  constructor(private adminService = new AdminService()) {}
  // ## USERS ##
  @Access([UserRoles.ADMIN])
  @Get("/users")
  async getUsers(@Response() res) {
    const users = await this.adminService.getUsers();
    res.json(users);
  }

  //## SECTIONS ##
  @Access([UserRoles.ADMIN])
  @Get("/sections")
  async getSections(@Response() res) {
    const sections = await this.adminService.getSections();
    res.json(sections);
  }

  @Access([UserRoles.ADMIN])
  @Get("/sections/:id")
  async getSectionById(@Response() res, @Params("id") id: number) {
    const sections = await this.adminService.getSectionById(+id);
    res.json(sections);
  }

  @Access([UserRoles.ADMIN])
  @Post("/sections")
  async postSection(
    @Response() res,
    @Body() body: { title: string; imageUrl: string }
  ) {
    const section = await this.adminService.createSection(
      body.title,
      body.imageUrl
    );
    res.json(section);
  }

  @Access([UserRoles.ADMIN])
  @Patch("/sections/:id")
  async patchSectionById(
    @Response() res,
    @Params("id") id: number,
    @Body() body: { title: string; imageUrl: string }
  ) {
    const section = await this.adminService.updateSection(+id, body);
    res.json(section);
  }

  @Access([UserRoles.ADMIN])
  @Delete("/sections/:id")
  async deleteSection(@Response() res, @Params("id") id: number) {
    await this.adminService.deleteSection(+id);
    res.json({ ok: true });
  }

  //## TOPICS ##
  @Access([UserRoles.ADMIN])
  @Get("/topics")
  async getTopics(@Response() res) {
    const topics = await this.adminService.getTopicList();
    res.json(topics);
  }

  @Access([UserRoles.ADMIN])
  @Get("/topics/:id")
  async getTopicById(@Response() res, @Params("id") id: number) {
    const topic = await this.adminService.getTopicById(+id);
    res.json(topic);
  }

  @Access([UserRoles.ADMIN])
  @Post("/topics")
  async postTopic(
    @Response() res,
    @Body()
    body: {
      title: string;
      text: string;
      videoId: string;
      sectionId: number;
      isPremium: boolean;
      order: number;
    }
  ) {
    const topic = await this.adminService.createTopic(body);
    res.json(topic);
  }

  @Access([UserRoles.ADMIN])
  @Patch("/topics/:id")
  async patchTopicById(
    @Response() res,
    @Params("id") id: number,
    @Body()
    body: {
      title: string;
      text: string;
      videoId: string;
      sectionId: number;
      isPremium: boolean;
      order: number;
    }
  ) {
    const topic = await this.adminService.updateTopic(+id, body);
    res.json(topic);
  }

  @Access([UserRoles.ADMIN])
  @Delete("/topics/:id")
  async deleteTopic(@Response() res, @Params("id") id: number) {
    await this.adminService.deleteTopic(+id);
    res.json({ ok: true });
  }

  //## TASKS ##
  @Access([UserRoles.ADMIN])
  @Get("/topics/:topicId/tasks")
  async getTasks(@Response() res, @Params("topicId") topicId: number) {
    const tasks = await this.adminService.getTopicTasks(+topicId);
    res.json(tasks);
  }

  @Access([UserRoles.ADMIN])
  @Post("/topics/:topicId/tasks")
  async postTask(
    @Response() res,
    @Params("topicId") topicId: number,
    @Body()
    body: {
      ka: string;
      ru: string;
      transcription: string;
      imageUrl: string;
      soundUrl: string;
      type: TaskTypes;
    }
  ) {
    const task = await this.adminService.createTask(+topicId, body);
    res.json(task);
  }

  @Access([UserRoles.ADMIN])
  @Patch("/topics/:topicId/tasks/:taskId")
  async patchTask(
    @Response() res,
    @Params("topicId") topicId: number,
    @Params("taskId") taskId: number,
    @Body()
    body: {
      ka: string;
      ru: string;
      transcription: string;
      imageUrl: string;
      soundUrl: string;
      type: TaskTypes;
    }
  ) {
    const task = await this.adminService.updateTask(+topicId, +taskId, body);
    res.json(task);
  }

  @Access([UserRoles.ADMIN])
  @Delete("/topics/:topicId/tasks/:taskId")
  async deleteTask(@Response() res, @Params("taskId") taskId: number) {
    await this.adminService.deleteTask(+taskId);
    res.json({ ok: true });
  }
}
