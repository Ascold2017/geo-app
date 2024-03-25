import { LessThan, LessThanOrEqual } from "typeorm";
import { DI } from "../entities";
import { User } from "../entities/user.entity";
import { ProgressListDTO } from "../dto/progress.dto";
import { BaseSectionDTO } from "../dto/section.dto";
import { UserTopicDTO, UserTopicWithTasksDTO } from "../dto/topic.dto";
import { sendNotificationByUserId } from "./push.service";
import _ from "lodash";

export async function checkIsShouldRepeatForUser(userId: string) {
  return await DI.progress.countBy({
    isCompleted: false,
    nextRepeat: LessThan(new Date().getTime()),
    // @ts-ignore
    user: { id: userId },
  }) > 0;
}

export async function changeUserSection(user: User, sectionId: number) {
  // @ts-ignore
  await DI.user.update(user.id, { currentSection: sectionId })
}

export async function checkReadedTask(userId: number, taskId: number) {
  let taskProgress = await DI.progress.findOneBy({ user: { id: userId }, task: { id: taskId } });
  if (!taskProgress) {
    // @ts-ignore
    taskProgress = DI.progress.create({ user: userId, task: taskId });
    taskProgress = await DI.progress.save(taskProgress)
  }
  const genMinutes = (mins: number) => mins * 60 * 1000;
  const genHours = (hours: number) => hours * genMinutes(60);
  const nextRepeatDates = [
    new Date(), // zero repeat
    new Date(), // first repeat
    new Date(Date.now() + genMinutes(15)), // third repeat - after 15 min
    new Date(Date.now() + genHours(10)), // fourth repeat - after 10 hours
    new Date(Date.now() + genHours(28)), // fifth repeat - after 28 hours
    new Date(Date.now() + genHours(24 * 4)), // sixth repeat - after 4 days
  ];

  if (taskProgress.repeated < 5) {
    DI.progress.merge(taskProgress, {
      nextRepeat: nextRepeatDates[taskProgress.repeated + 1].getTime(),
      repeated: taskProgress.repeated + 1,
    });
  } else {
    DI.progress.merge(taskProgress, {
      isCompleted: true,
    });
  }

  await DI.progress.save(taskProgress);
}

export async function checkCompletedTask(userId: number, taskId: number, value: boolean) {
  const taskProgress = await DI.progress.findOneByOrFail({
    user: { id: userId },
    task: { id: taskId },
  });
  DI.progress.merge(taskProgress, {
    isCompleted: value,
    nextRepeat: new Date().getTime(),
    repeated: 1,
  });

  await DI.progress.save(taskProgress);
}

export async function getTasksToRepeat(userId: number, sectionId: number) {
  return await DI.progress.find(
    {
      where: {
        user: { id: userId },
        isCompleted: false,
        nextRepeat: LessThanOrEqual(new Date().getTime()),
        task: {
          topic: {
            section: {
              id: sectionId
            }
          }
        }
      },
      relations: {
        task: true
      }
    });
}

export async function getProgress(userId: number, sectionId: number) {
  const progress = await DI.progress.find({
    where: {
      user: { id: userId },
      task: {
        topic: {
          section: {
            id: sectionId
          }
        }
      }
    },
    relations: {
      task: true
    }
  });

  return new ProgressListDTO(progress).tasks;
}

export async function getSections() {
  const sections = await DI.section.find({});
  return sections.map(
    (section) => new BaseSectionDTO(section),
  );
}

export async function getTopicList(userId: number, sectionId: number) {
  const topics = await DI.topic.find(
    {
      where: {
        section: { id: sectionId },
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
      user: { id: userId }
    },
    relations: {
      task: {
        topic: true
      }
    }
  })

  return topics.map(topic => new UserTopicDTO(topic, progress.filter(p => p.task.topic.id === topic.id)))

}

export async function getUserTopic(userId: number, topicId: number) {
  const topic = await DI.topic.findOne({

    where: {
      id: topicId,
    },
    order: {
      order: 1
    },
    relations: {
      section: true,
      tasks: true
    }

  });


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
      user: { id: userId },
      task: {
        topic: { id: topicId, }
      }
    },
    relations: {
      task: {
        topic: true
      }
    }
  })

  return new UserTopicWithTasksDTO(
    topic, progress
  );
}

export const getUserNearestRepeatDate = async (user: User) => {
  if (!user.currentSection) return null;
  const progress = await DI.progress.findOne(
    {
      where: {
        user: { id: user.id },
        isCompleted: false,
        task: {
          topic: {
            section: { id: user.currentSection as unknown as number  }
          }
        }
      },
      order: {
        nextRepeat: 1
      },
      
    },
  );

  return progress ? +progress.nextRepeat : null;
};

export const checkRepeatNotifierDaemon = () => 
{
  
  async function daemon() {
    const list = await DI.progress.find({
      where: {
        isCompleted: false,
        nextRepeat: LessThan(new Date().getTime()),
      },
      relations: {
        user: true
      }
      
    });
    const userIds = _.uniq(list.map((tp) => tp.user.id));

    userIds.forEach((id) => sendNotificationByUserId(id, "Пора потренироваться!"));
  }
  daemon();
  setInterval(
    async () => {
      daemon();
    },
    10 * 1000,
  ); // every 15 mins
  
};