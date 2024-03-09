import { PlaySquareOutlined, CheckCircleFilled, QuestionCircleFilled, LoadingOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
// @ts-ignore sds
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { UserTask } from '@common/constants/types';
import useAudio from '@utils/useAudio';
import { isMatchQA, splitVariant, } from '@utils/stringUtils';

type Props = { task: UserTask, onCheckReaded: () => void };

export default function SpeakingCard({ task, onCheckReaded }: Props) {
  const { play } = useAudio(task.soundUrl || null);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const [isRecording, setIsRecording] = useState(false);
  const [record, setRecord] = useState("")
  const [isShowTranscription, setIsShowTranscription] = useState(false);
  const isSuccess = isMatchQA(record, task.ka);
  const toggleTranscription = () => setIsShowTranscription(!isShowTranscription);

  useEffect(() => {
    if (isRecording) {
      setRecord(transcript)
    }
  }, [transcript, isRecording])

  useEffect(() => {
    if (isSuccess) onCheckReaded();
  }, [record]);

  useEffect(() => {
    if (isSuccess) play();
  }, [isSuccess])



  const onPressStart = () => {
    resetTranscript();
    SpeechRecognition.startListening({ language: 'ka-GE', continuous: true });
    setIsRecording(true);
  }
  const onPressEnd = () => {
    SpeechRecognition.stopListening()
    setIsRecording(false);
  }

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

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

