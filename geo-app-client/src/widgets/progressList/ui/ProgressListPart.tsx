import { UserTask } from "@entities/task";
import { useCheckCompletedTask } from "@features/checkCompletedTask";
import { AppList, Checkbox, formatDDHHMM } from "@shared";


interface ProgressListPartProps {
    title?: string;
    hideTitle: boolean;
    hideRepeatTime?: boolean;
    data: UserTask[],
    range: [from: number | null, to: number | null];
    onRefresh: () => void;
}
export default function ProgressListPart({ title, hideTitle, hideRepeatTime, data, range, onRefresh }: ProgressListPartProps) {
    const { checkCompletedTask } = useCheckCompletedTask()
    const genHours = (hours: number) => hours * 60 * 60 * 1000;
    const inRange = (fromHours: number | null, toHours: number | null) => (item: UserTask) => {
        const from = fromHours !== null ? + new Date(item.nextRepeat) > +new Date() + genHours(fromHours) : true;
        const to = toHours !== null ? + new Date(item.nextRepeat) < +new Date() + genHours(toHours) : true;
        return from && to;
    }

    const onCheckCompleted = (id: number, isCompleted: boolean) => {
        checkCompletedTask(id, isCompleted);
        onRefresh()
    }

    const dataInRange = data.filter(inRange(range[0], range[1]));

    if (!dataInRange.length) return null;

    return <>
        {!hideTitle && <h4 className="app-title-2 text-center py-3">{title}</h4>}
        <AppList
            className="mb-3"
            items={dataInRange}
            renderItem={item => <div className="flex items-center">
                <div className="mr-auto">{item.ka} [{item.transcription}]</div>
                <div>Повторов: {item.repeated}</div>
                {(!item.isCompleted && !hideRepeatTime) && <div className="ml-3">Ближайший: {formatDDHHMM(item.nextRepeat)}</div>}
                <Checkbox className="ml-3" label="Я знаю это" checked={item.isCompleted} onChecked={e => onCheckCompleted(item.id, e)} />
            </div>}
        />
    </>
}