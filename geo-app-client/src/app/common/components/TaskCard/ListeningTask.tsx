import { CheckCircleFilled, PlaySquareOutlined, QuestionCircleFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { UserTask } from "@common/constants/types";
import useAudio from "@utils/useAudio";
import shuffleArray from "@utils/shuffleArray";
import { generateBlocks, isMatchQA, splitVariant } from "@utils/stringUtils";
import { useMount } from "ahooks";

type Props = { task: UserTask, tasks: UserTask[], onCheckReaded: () => void };

export default function ListeningTask({ task, tasks, onCheckReaded }: Props) {
    const { play } = useAudio(task.soundUrl || null);
    const [isShowTranscription, setIsShowTranscription] = useState(false);

    const [kaBlocks, setKaBlocks] = useState<string[]>([])
    const [answerBlocks, setAnswerBlocks] = useState<string[]>([]);
    const isSuccess = isMatchQA(answerBlocks, task.ka);

    useMount(() => init())

    useEffect(() => {
        if (isSuccess) onCheckReaded();
    }, [answerBlocks, isSuccess, onCheckReaded]);

    useEffect(() => {
        if (isSuccess) play();
    }, [isSuccess, play])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    function init() {
        setKaBlocks(generateBlocks(task.ka, shuffleArray(tasks).slice(0, 3).map(t => t.ka)));

    }

    const addBlock = (block: string) => {
        setAnswerBlocks([...answerBlocks, block])
    };
    const removeBlock = (i: number) => setAnswerBlocks(answerBlocks.filter((_b, index) => index !== i));
    const toggleTranscription = () => setIsShowTranscription(!isShowTranscription)

    return <>
        <div className="task-card">
            <div className="task-card-container">
                <CheckCircleFilled className="task-card-status" style={{ color: isSuccess ? 'green' : 'red' }}/>
                {task.imageUrl && <img src={task.imageUrl} className="task-card-image" />}
                <p className="app-text-1 text-center px-9">
                    {
                        isShowTranscription
                            ? <span>Транскр.: {task.transcription}</span>
                            : isSuccess
                                ? <span>{splitVariant(task.ru)}</span>
                                : <span>Что вы услышали?</span>
                    }
                </p>
                <button title="Показать транскрипцию" onClick={toggleTranscription} className="btn task-card-transcription"><QuestionCircleFilled /></button>
                <button title="Прослушать" disabled={!task.soundUrl} onClick={(e) => { e.stopPropagation(); play() }} className="btn task-card-play">
                    <PlaySquareOutlined />
                </button>
            </div>

            <div className="flex wrap items-center mt-6">
                <span className="app-text-2 mr-3">Ответ: </span>{answerBlocks.map((b, i) => <button className="btn mr-1 mb-1" key={i} onClick={() => removeBlock(i)}>{b}</button>)}
            </div>
        </div>
        <div className="divider"/>
        <div>
            {kaBlocks.map((b, i) =>  <button key={i} onClick={() => addBlock(b)} className="btn mx-1 my-1">{b}</button>)}
        </div>
    </>
}