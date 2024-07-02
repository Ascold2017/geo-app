import { TaskCardPractice, UserTask } from "@entities/task";
import { useCheckSpeakingPractice } from "../model";
import { LoadingOutlined, PlaySquareOutlined } from "@ant-design/icons";
import { useAudio } from "@shared";
import { useEffect } from "react";

interface CheckSpeakingPracticeCardProps {
  task: UserTask;
  onSuccess: () => void;
}
export function CheckSpeakingPracticeCard({ task, onSuccess }: CheckSpeakingPracticeCardProps) {
  const { play } = useAudio(task.soundUrl || null);
  const { isSuccess, isRecording, record, listening, onPressEnd, onPressStart } = useCheckSpeakingPractice(task);

  useEffect(() => {
    play();
    onSuccess()
  }, [isSuccess]);

  return (
    <>
      <TaskCardPractice
        task={task}
        isRevert={false}
        isSuccess={isSuccess}
        playSlot={
          <button
            onMouseDown={onPressStart}
            onMouseUp={onPressEnd}
            onTouchStart={onPressStart}
            onTouchEnd={onPressEnd}
            className='btn task-card-play'
          >
            {isRecording && listening ? <LoadingOutlined /> : <PlaySquareOutlined />} Говорить
          </button>
        }
        footerSlot={
          <div className="flex wrap items-center mt-6">
            <span className="app-text-2 mr-3">Ответ: </span>
            {record && <button className="btn mr-1 mb-1" onClick={onPressEnd}>{record}</button>}
          </div>
        }
      />

      <div className="divider" />

      <div>Вы сказали: {record || '_________'}</div>
      {isSuccess && <div>Перевод: {task.ru}</div>}
    </>
  );
}