import { Context } from "koa";
import { DI } from "../../../main";
import { getUserNearestRepeatDate } from "./progress.service";
import { ProgressListDTO } from "./progress.dto";
import { uncheckRecieveNotification } from "../../push/push.service";
import { LessThanOrEqual } from 'typeorm'

export const postReadTask = async (context: Context) => {

  let taskProgress = await DI.progress.findOneBy({ user: { id: context.state.user.id }, task: { id: context.params.id } });
  if (!taskProgress) {
    taskProgress = DI.progress.create({ user: context.state.user.id, task: context.params.id });
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
  
    // Check is training completed
    const nextRepeat = await getUserNearestRepeatDate(context.state.user);
    if (nextRepeat && nextRepeat > new Date().getTime()) {
      uncheckRecieveNotification(context.state.user.id);
    }
  
  context.response.body = { ok: true };
};

export const postCompleteTask = async (context: Context) => {
  const taskProgress = await DI.progress.findOneBy({
    user: { id: context.state.user.id },
    task: { id: context.params.id },
  });
  if (!taskProgress) {
    context.response.status = 404;
    context.response.body = { error: "Не найден" };
    return;
  }
  DI.progress.merge(taskProgress, {
    isCompleted: context.request.body.value,
    nextRepeat: new Date().getTime(),
    repeated: 1,
  });

  await DI.progress.save(taskProgress);

  context.response.body = { ok: true };
};

export const getTasksToRepeat = async (context: Context) => {
  const progress = await DI.progress.find(
    {
      where: {
        user: { id: context.state.user.id },
        isCompleted: false,
        nextRepeat: LessThanOrEqual(new Date().getTime()),
        task: {
          topic: {
            section: {
              id: context.state.user.currentSection
            }
          }
        }
      },
      relations: {
        task: true
      }
    });

  const nextRepeat = await getUserNearestRepeatDate(context.state.user);

  context.response.body = new ProgressListDTO(progress, nextRepeat);
};

export const getTaskProgress = async (context: Context) => {

  const progress = await DI.progress.find({
    where: {
      user: { id: context.state.user.id },
      task: {
        topic: {
          section: {
            id: context.state.user.currentSection
          }
        }
      }
    },
    relations: {
      task: true
    }
  });

  context.response.body = new ProgressListDTO(progress).tasks;

};
