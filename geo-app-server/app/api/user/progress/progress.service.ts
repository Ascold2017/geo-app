import _ from "lodash";
import { DI } from "../../../main";
import { sendNotificationById } from "../../push/push.service";

import { User } from "../user.entity";
import { LessThan } from 'typeorm'

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

    userIds.forEach((id) => sendNotificationById(id, "Пора потренироваться!"));
  }
  daemon();
  setInterval(
    async () => {
      daemon();
    },
    10 * 1000,
  ); // every 15 mins
  
};

