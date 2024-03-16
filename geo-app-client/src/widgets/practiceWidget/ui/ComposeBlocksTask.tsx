import { CheckCircleFilled, PlayCircleFilled, QuestionCircleFilled } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { UserTask } from "@entities/task";
import { useAudio, shuffle, generateBlocks, isMatchQA, splitVariant } from "@shared";
import { useMount } from "ahooks";

type Props = { isRevert: boolean; task: UserTask, tasks: UserTask[], onCheckReaded: () => void };

export default function ComposeBlocksTask({ isRevert, task, tasks, onCheckReaded }: Props) {
    const { play } = useAudio(task.soundUrl || null);
    const [isShowTranscription, setIsShowTranscription] = useState(false);

    const [kaBlocks, setKaBlocks] = useState<string[]>([])
    const [ruBlocks, setRuBlocks] = useState<string[]>([])
    const [answerBlocks, setAnswerBlocks] = useState<string[]>([]);
    const isSuccess = isMatchQA(answerBlocks, isRevert ? task.ka : task.ru);

    useMount(() => init())

    useEffect(() => {
        if (isSuccess) onCheckReaded();
    }, [isSuccess]);

    useEffect(() => {
        if (isSuccess) play();
    }, [isSuccess])

    function init() {
        setKaBlocks(generateBlocks(task.ka, shuffle(tasks).slice(0, 3).map(t => t.ka)));
        setRuBlocks(generateBlocks(task.ru, shuffle(tasks).slice(0, 3).map(t => t.ru)));
    }

    const addBlock = (block: string) => {
        setAnswerBlocks([...answerBlocks, block])
    };
    const removeBlock = (i: number) => setAnswerBlocks(answerBlocks.filter((_b, index) => index !== i));
    const toggleTranscription = () => setIsShowTranscription(!isShowTranscription)

    return <>
        <div className="task-card">
            <div className="task-card-container" >
                <CheckCircleFilled className="task-card-status" style={{ color: isSuccess ? 'green' : 'red' }} />
                {task.imageUrl && <img src={task.imageUrl} className="task-card-image" />}
                <p className="app-text-1 text-center px-9">
                    {
                        isShowTranscription
                            ? <span>Транскр.: {task.transcription}</span>
                            : <span>{splitVariant(isRevert ? task.ru : task.ka)}</span>
                    }
                </p>
                <button title="Показать транскрипцию" onClick={toggleTranscription} className="btn task-card-transcription"><QuestionCircleFilled /></button>
                <button title="Прослушать" disabled={!task.soundUrl} onClick={(e) => { e.stopPropagation(); play() }} className="btn task-card-play">
                    <PlayCircleFilled />
                </button>
            </div>
            <div className="flex wrap items-center mt-6">
                <span className="app-text-2 mr-3">Ответ: </span>{answerBlocks.map((b, i) => <button className="btn mr-1 mb-1" key={i} onClick={() => removeBlock(i)}>{b}</button>)}
            </div>
        </div>
        <div className="app-divider" />
        <div>
            {(isRevert ? kaBlocks : ruBlocks).map((b, i) => <button key={i} onClick={() => addBlock(b)} className="btn mx-1 my-1">{b}</button>)}
        </div>
    </>
}