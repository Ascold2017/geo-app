import { CheckCircleFilled, EditOutlined, PlayCircleFilled, QuestionCircleFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { UserTask } from "@common/constants/types";
import useAudio from "@utils/useAudio";
import { isMatchQA, splitVariant } from "@utils/stringUtils";
import Keyboard from "./Keyboard";
type Props = { isRevert: boolean; task: UserTask, onCheckReaded: () => void };


export default function WritingTask({ task, isRevert, onCheckReaded }: Props) {
    const { play } = useAudio(task.soundUrl || null);
    const [isShowTranscription, setIsShowTranscription] = useState(false);
    const [isShowKeyboard, setIsShowKeyboard] = useState(false);
    const [userAnswer, setUserAnswer] = useState('');
    const isSuccess = isMatchQA(userAnswer, isRevert ? task.ka : task.ru);
    const toggleTranscription = () => setIsShowTranscription(!isShowTranscription)
    const toggleKeyboard = () => setIsShowKeyboard(!isShowKeyboard);

    useEffect(() => {
        if (isSuccess) onCheckReaded();
    }, [userAnswer]);

    useEffect(() => {
        if (isSuccess) play();
    }, [isSuccess])

    return <>
        <div className="task-card">
            <div className="task-card-container">
                <CheckCircleFilled className="task-card-status" style={{ color: isSuccess ? 'green' : 'red' }} />
                {task.imageUrl && <img src={task.imageUrl} className="task-card-image" />}
                <p className="app-text-1 text-center px-9">
                    {
                        isShowTranscription
                            ? <span>Транскр.: {task.transcription}</span>
                            : <span>{splitVariant(isRevert ? task.ru : task.ka)}</span>
                    }
                </p>
                <button title="Показать транскрипцию" onClick={toggleTranscription} className="task-card-transcription"><QuestionCircleFilled /></button>
                <button title="Прослушать" disabled={!task.soundUrl} onClick={(e) => { e.stopPropagation(); play() }} className="task-card-play" >
                    <PlayCircleFilled />
                </button>
            </div>
            <div className="relative">
                {isRevert &&
                    <button
                        onClick={toggleKeyboard}
                        className="task-card-keyboard"
                    ><EditOutlined /></button>
                }

                <textarea className="input" placeholder={isRevert ? 'Пишите по-грузински' : 'Пишите по-русски'} value={userAnswer} onChange={e => setUserAnswer(e.target.value)} />
            </div>

            {isShowKeyboard && isRevert && <Keyboard value={userAnswer} inputHandler={setUserAnswer} />}

        </div>
    </>
}