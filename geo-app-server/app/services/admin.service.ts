import { Not } from "typeorm";
import { DI } from "../entities";
import { UserRoles } from "../entities/user.entity";
import { BaseUserDTO } from "../dto/user.dto";
import { AdmSectionDTO, BaseSectionDTO } from "../dto/section.dto";
import { Section } from "../entities/section.entity";
import { TopicDTO, TopicWithTasksDTO } from "../dto/topic.dto";
import { Topic } from "../entities/topic.entity";
import { Task } from "../entities/task.entity";
import { TaskDTO } from "../dto/task.dto";

export async function getUsers() {
    const users = await DI.user.find({
        where: { role: Not(UserRoles.ADMIN) },
    });
    return users.map((u) => new BaseUserDTO(u));
}

export async function getSections() {
    const sections = await DI.section.find({ select: { topics: { id: true } }, relations: { topics: true } });
    return sections.map(
        (section) => new AdmSectionDTO(section),
    );
}

export async function getSectionById(sectionId: number) {
    const section = await DI.section.findOneOrFail({ where: { id: sectionId } });

    return new BaseSectionDTO(section);
}


export async function createSection(title: string, imageUrl: string) {
    const section = DI.section.create({ title, imageUrl });
    await DI.section.save(section);
    return new BaseSectionDTO(section);
}

export async function updateSection(sectionId: number, payload: Partial<Section>) {
    const section = await DI.section.findOneByOrFail({ id: sectionId });

    DI.section.merge(section, payload)
    await DI.section.save(section);
    return new BaseSectionDTO(section);
}

export async function deleteSection(sectionId: number) {
    const section = await DI.section.findOneOrFail({ where: { id: sectionId } });
    await DI.section.remove(section)
}

// topics //

export async function getTopicList() {
    const topics = await DI.topic.find({
        select: { section: { id: true } },
        relations: { section: true }, order: { order: 1 }
    });

    return topics.map((topic) => new TopicDTO(topic))
}

export async function getTopicById(topicId: number) {
    const topic = await DI.topic.findOneOrFail({
        where: { id: topicId },
        select: {
            section: { id: true }
        },
        relations: {
            tasks: true,
            section: true
        }
    });
    return new TopicWithTasksDTO(topic);
}

export async function createTopic(payload: Partial<Topic>) {
    const topic = DI.topic.create(payload);
    const createdTopic = await DI.topic.save(topic);
    // @ts-ignore
    return new TopicDTO({ ...createdTopic, section: { id: createdTopic.section } });
}

export async function updateTopic(topicId: number, payload: Partial<Topic>) {
    const topic = await DI.topic.findOne({
        where: { id: topicId },
        select: {
            section: { id: true }
        },
        relations: {
            section: true,
        }
    });

    DI.topic.merge(topic, payload)
    DI.topic.save(topic)

    return new TopicDTO(topic);
}

export async function deleteTopic(topicId: number) {
    const topic = await DI.topic.findOneOrFail({ where: { id: topicId } })
    await DI.topic.remove(topic);
}

// task //

export async function createTask(topicId: number, payload: Partial<Task>) {
    await DI.topic.findOneByOrFail({ id: topicId });

    const task = DI.task.create(payload);
    await DI.task.save(task);
    return new TaskDTO(task);
}

export async function updateTask(topicId: number, taskId: number, payload: Partial<Task>) {
    await DI.topic.findOneByOrFail({ id: topicId });
    const task = await DI.task.findOneByOrFail({ id: taskId });

    DI.task.merge(task, payload)
    await DI.task.save(task);
    return new TaskDTO(task);
}

export async function deleteTask(taskId: number) {
    const task = await DI.task.findOneByOrFail({ id: taskId });
    await DI.task.remove(task);
}