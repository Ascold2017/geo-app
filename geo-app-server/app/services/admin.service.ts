import { Not } from "typeorm";
import { DI } from "../config/data-source";
import { UserRoles } from "../entities/user.entity";
import { BaseUserDTO } from "../dto/user.dto";
import { AdmSectionDTO, BaseSectionDTO } from "../dto/section.dto";
import { Section } from "../entities/section.entity";
import { TopicDTO, TopicWithTasksDTO } from "../dto/topic.dto";
import { Topic } from "../entities/topic.entity";
import { Task } from "../entities/task.entity";
import { TaskDTO } from "../dto/task.dto";

export class AdminService {
  async getUsers() {
    const users = await DI.user.find({
      where: { role: Not(UserRoles.ADMIN) },
    });
    return users.map((u) => new BaseUserDTO(u));
  }

  async getSections() {
    const sections = await DI.section.find({
      select: { topics: { id: true } },
      relations: { topics: true },
    });
    return sections.map((section) => new AdmSectionDTO(section));
  }

  async getSectionById(sectionId: number) {
    const section = await DI.section.findOneOrFail({
      where: { id: sectionId },
    });

    return new BaseSectionDTO(section);
  }

  async createSection(title: string, imageUrl: string) {
    const section = DI.section.create({ title, imageUrl });
    await DI.section.save(section);
    return new BaseSectionDTO(section);
  }

  async updateSection(sectionId: number, payload: Partial<Section>) {
    const section = await DI.section.findOneByOrFail({ id: sectionId });

    DI.section.merge(section, payload);
    await DI.section.save(section);
    return new BaseSectionDTO(section);
  }

  async deleteSection(sectionId: number) {
    const section = await DI.section.findOneOrFail({
      where: { id: sectionId },
    });
    await DI.section.remove(section);
  }

  async getTopicList() {
    const topics = await DI.topic.find({
      select: { section: { id: true } },
      relations: { section: true },
      order: { order: 1 },
    });

    return topics.map((topic) => new TopicDTO(topic));
  }

  async getTopicById(topicId: number) {
    const topic = await DI.topic.findOneOrFail({
      where: { id: topicId },
      select: {
        section: { id: true },
      },
      relations: {
        section: true,
      },
    });
    return new TopicDTO(topic);
  }

  async createTopic(payload: Partial<Topic>) {
    const topic = DI.topic.create({
      ...payload,
      // @ts-ignore
      section: { id: payload.sectionId },
    });
    const createdTopic = await DI.topic.save(topic);
    
    return new TopicDTO({
      ...createdTopic,
      // @ts-ignore
      section: { id: createdTopic.section.id },
    });
  }

  async updateTopic(topicId: number, payload: Partial<Topic>) {
    const topic = await DI.topic.findOne({
      where: { id: topicId },
      select: {
        section: { id: true },
      },
      relations: {
        section: true,
      },
    });

    DI.topic.merge(topic, payload);
    DI.topic.save(topic);

    return new TopicDTO(topic);
  }

  async deleteTopic(topicId: number) {
    const topic = await DI.topic.findOneOrFail({ where: { id: topicId } });
    await DI.topic.remove(topic);
  }

  async getTopicTasks(topicId: number) {
    const data = await DI.task.findBy({
      topic: { id: topicId },
    });

    return data.map((task) => new TaskDTO(task));
  }

  async createTask(topicId: number, payload: Partial<Task>) {
    await DI.topic.findOneByOrFail({ id: topicId });

    const task = DI.task.create(payload);
    await DI.task.save(task);
    return new TaskDTO(task);
  }

  async updateTask(topicId: number, taskId: number, payload: Partial<Task>) {
    await DI.topic.findOneByOrFail({ id: topicId });
    const task = await DI.task.findOneByOrFail({ id: taskId });

    DI.task.merge(task, payload);
    await DI.task.save(task);
    return new TaskDTO(task);
  }

  async deleteTask(taskId: number) {
    const task = await DI.task.findOneByOrFail({ id: taskId });
    await DI.task.remove(task);
  }
}
