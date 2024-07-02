import { PracticeTypes } from "../model"
import { RadarChartOutlined, EditOutlined, CustomerServiceOutlined, AudioOutlined, BuildOutlined } from "@ant-design/icons"

interface SelectPracticeTypeProps {
    headerSlot?: React.ReactNode
    onSelectedTaskTypes: (types: PracticeTypes[]) => void
}
export function SelectPracticeType({ headerSlot, onSelectedTaskTypes }: SelectPracticeTypeProps) {

    return (<div className="grid grid-cols-2 gap-4">
        {
            headerSlot && <div className="col-span-2">{headerSlot}</div>
        }

        <button className="btn col-span-2" onClick={() => onSelectedTaskTypes(Object.values(PracticeTypes))}>
            <RadarChartOutlined /> Смешанный
        </button>

        <button className="btn justify-start" onClick={() => onSelectedTaskTypes([PracticeTypes.WRITING, PracticeTypes.WRITING_REVERT])}>
            <EditOutlined /> Писание
        </button>
        <button className="btn justify-start" onClick={() => onSelectedTaskTypes([PracticeTypes.LISTENING])}>
            <CustomerServiceOutlined /> Прослушивание
        </button>
        <button className="btn justify-start" onClick={() => onSelectedTaskTypes([PracticeTypes.SPEAKING])}>
            <AudioOutlined /> Говорение
        </button>
        <button className="btn justify-start" onClick={() => onSelectedTaskTypes([PracticeTypes.COMPOSE, PracticeTypes.COMPOSE_REVERT])}>
            <BuildOutlined /> Простой
        </button>
    </div>)

}