import { UserTask } from "@common/constants/types";
import { formatDDHHMM } from "@utils/date"
import AppList from "@common/components/ui/AppList";
import AppCheckbox from "@common/components/ui/AppCheckbox";

type Props = {
    title?: string;
    hideTitle: boolean;
    hideRepeatTime?: boolean;
    data: UserTask[],
    range: [from: number | null, to: number | null];
    checkCompleted: (id: number, value: boolean) => Promise<void>
}
export default function ProgressList({ title, hideTitle, hideRepeatTime, data, range, checkCompleted }: Props) {

    const genHours = (hours: number) => hours * 60 * 60 * 1000;
    const inRange = (fromHours: number | null, toHours: number | null) => (item: UserTask) => {
        const from = fromHours !== null ? + new Date(item.nextRepeat) > +new Date() + genHours(fromHours) : true;
        const to = toHours !== null ? + new Date(item.nextRepeat) < +new Date() + genHours(toHours) : true;
        return from && to;
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
                <AppCheckbox className="ml-3" label="Я знаю это" checked={item.isCompleted} onChecked={e => checkCompleted(item.id, e)} />
            </div>}
        />

    </>
}