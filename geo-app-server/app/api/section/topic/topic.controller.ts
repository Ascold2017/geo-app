import {
  UserTopicDTO,
  TopicDTO,
  TopicWithTasksDTO,
  UserTopicWithTasksDTO,
} from "./topic.dto";
import { Context } from "koa";
import { DI } from "../../../main";

export const getUserTopicList = async (context: Context) => {

  if (!context.state.user.currentSection) {
    context.response.body = []
  }
  const topics = await DI.topic.find(
    {
      where: {
        section: { id: context.state.user.currentSection },
      },
      order: {
        order: 1
      },
      relations: {
        section: true,
        tasks: true
      }
      
    },
  );

  const progress = await DI.progress.find({
    select: {
      repeated: true,
      task: {
        id: true,
        topic: {
          id: true
        }
      }
    },
    where: {
      user: { id: context.state.user.id }
    },
    relations: {
      task: {
        topic: true
      }
    }
  })

  context.response.body = topics.map(topic => new UserTopicDTO(topic, progress.filter(p => p.task.topic.id === topic.id)))
  
};

export const getUserTopic = async (context: Context) => {
  const topic = await DI.topic.findOne({

    where: {
      id: context.params.id,
    },
    order: {
      order: 1
    },
    relations: {
      section: true,
      tasks: true
    }
    
  });

  
  if (!topic || !context.state.user.currentSection) {
    context.response.status = 404;
    context.response.body = { error: "Не найден(" };
    return;
  }

  const progress = await DI.progress.find({
    select: {
      repeated: true,
      task: {
        id: true,
        topic: {
          id: true
        }
      }
    },
    where: {
      user: { id: context.state.user.id },
      task: {
        topic: { id: context.params.id, }
      }
    },
    relations: {
      task: {
        topic: true
      }
    }
  })

  context.response.body = new UserTopicWithTasksDTO(
    topic, progress
  );
  
};

// adm ---|

export const getTopicList = async (context: Context) => {

  const topics = await DI.topic.find({
    select: { section: { id: true } },
    relations: { section: true }, order: { order: 1 }
  });

  context.response.body = topics.map((topic) => new TopicDTO(topic))

};

export const getTopic = async (context: Context) => {

  const topic = await DI.topic.findOne({
    where: { id: context.params.id },
    select: {
      section: { id: true }
    },
    relations: {
      tasks: true,
      section: true
    }
  });
  if (!topic) {
    context.response.status = 404;
    context.response.body = { error: "Не найден(" };
    return;
  }

  context.response.body = new TopicWithTasksDTO(topic);

};

export const createTopic = async (context: Context) => {
  const data = context.request.body as any;
  const payload = {
    title: data.title,
    text: data.text,
    videoId: data.videoId,
    section: data.sectionId,
    isPremium: data.isPremium,
    order: data.order
  }
  const topic = DI.topic.create(payload);
  const createdTopic = await DI.topic.save(topic);
  // @ts-ignore
  context.response.body = new TopicDTO({ ...createdTopic, section: { id: createdTopic.section } });
};

export const patchTopic = async (context: Context) => {

  const data = context.request.body as any;
  const payload = {
    title: data.title,
    text: data.text,
    videoId: data.videoId,
    section: data.sectionId,
    isPremium: data.isPremium,
    order: data.order
  }
  const topic = await DI.topic.findOne({
    where: { id: context.params.id },
    select: {
      section: { id: true }
    },
    relations: {
      section: true,
    }
  });

  DI.topic.merge(topic, payload)
  DI.topic.save(topic)
  
  context.response.body = new TopicDTO(topic);

};

export const deleteTopic = async (context: Context) => {
  
  const topic = await DI.topic.findOne({ where: { id: context.params.id } })
  if (!topic) {
    context.response.status = 404;
    context.response.body = { error: "Не найден(" };
    return;
  }
  await DI.topic.remove(topic);

  context.response.body = { ok: true };
  
};
