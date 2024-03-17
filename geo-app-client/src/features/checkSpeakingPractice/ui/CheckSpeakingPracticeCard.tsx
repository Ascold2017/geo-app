import { UserTask } from "@entities/task";
import { useCheckSpeakingPractice } from "../model";
import { CheckCircleFilled, LoadingOutlined, PlaySquareOutlined, QuestionCircleFilled } from "@ant-design/icons";
import { splitVariant, useAudio } from "@shared";
import { useEffect, useState } from "react";

interface CheckSpeakingPracticeCardProps {
    task: UserTask;
    onSuccess: () => void;
}
export function CheckSpeakingPracticeCard({ task, onSuccess }: CheckSpeakingPracticeCardProps) {
    const { play } = useAudio(task.soundUrl || null);
    const { isSuccess, isRecording, record, listening, onPressEnd, onPressStart} = useCheckSpeakingPractice(task);
    const [isShowTranscription, setIsShowTranscription] = useState(false);
    const toggleTranscription = () => setIsShowTranscription(!isShowTranscription);

    useEffect(() => {
        play();
        onSuccess()
    }, [isSuccess]);
    
    return (
        <>
          <div className='task-card'>
            <div className="task-card-container">
              <CheckCircleFilled className='task-card-status' style={{ color: isSuccess ? 'green' : 'red' }} />
              {task.imageUrl && <img src={task.imageUrl} className='task-card-image' />}
              <p className="app-text-2 text-center px-9">
                {
                  isShowTranscription
                    ? <span>Транскр.: {task.transcription}</span>
                    : <span>{splitVariant(task.ka)}</span>
                }
              </p>
              <button title="Показать транскрипцию" onClick={toggleTranscription} className='task-card-transcription'><QuestionCircleFilled /></button>
    
              <button
                onMouseDown={onPressStart}
                onMouseUp={onPressEnd}
                onTouchStart={onPressStart}
                onTouchEnd={onPressEnd}
                className='btn task-card-play'
              >
                {isRecording && listening ? <LoadingOutlined /> : <PlaySquareOutlined />} Говорить
              </button>
            </div>
          </div>
    
          <div className="divider" />
    
          <div>Вы сказали: {record || '_________'}</div>
          {isSuccess && <div>Перевод: {task.ru}</div>}
        </>
      );
}