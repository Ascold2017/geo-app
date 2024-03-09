import { TaskDTO } from "./task.dto";
import _ from "lodash";
import { Context } from "koa";
import { DI } from "../../../../main";

// adm
export const createTask = async (context: Context) => {
  try {
    await DI.topic.findOneByOrFail({ id: context.params.topicId });

    const body = context.request.body;
    const payload = {
      topic: context.params.topicId,
      ka: body.ka,
      ru: body.ru,
      transcription: body.transcription,
      imageUrl: body.imageUrl,
      soundUrl: body.soundUrl,
      type: body.type,
    };

    const task = DI.task.create(payload);
    await DI.task.save(task);
    context.response.body = new TaskDTO(task);
  } catch {
    context.response.status = 404;
    context.response.body = { error: "Такой темы не существует" };
  }
};

export const patchTask = async (context: Context) => {
  
  try {
    await DI.topic.findOneByOrFail({ id: context.params.topicId });
    try {
      const task = await DI.task.findOneByOrFail({ id: context.params.id });
      const body = context.request.body;
      const payload = {
        ka: body.ka,
        ru: body.ru,
        transcription: body.transcription,
        imageUrl: body.imageUrl,
        soundUrl: body.soundUrl,
        type: body.type,
      };
      DI.task.merge(task, payload)
      await DI.task.save(task);
      context.response.body = new TaskDTO(task);
    } catch {
      context.response.status = 404;
      context.response.body = { error: "Такого упражнения не существует" };
    }
  } catch {
    context.response.status = 404;
    context.response.body = { error: "Такой темы не существует" };
  }

};

export const deleteTask = async (context: Context) => {
  
  try {
    await DI.topic.findOneByOrFail({ id: context.params.topicId });
    try {
      const task = await DI.task.findOneByOrFail({ id: context.params.id });
      await DI.task.remove(task);
      context.response.body = { ok: true };
    } catch {
      context.response.status = 404;
      context.response.body = { error: "Такого упражнения не существует" };
    }
  } catch {
    context.response.status = 404;
    context.response.body = { error: "Такой темы не существует" };
  }
  
};
