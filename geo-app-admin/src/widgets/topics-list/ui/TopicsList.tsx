import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { DeleteTopicButton } from "@features/deleteTopic/ui/DeleteTopicButton";
import { BaseSection } from "@entities/sections";
import { BaseTopic } from "@entities/topics";
import { AppTable, AppTableColumn, TOPIC_GEN } from "@shared";


export interface TopicsListProps {
    data: BaseTopic[];
    loading: boolean;
    sections: BaseSection[];
}
export function TopicsList({ data, loading, sections }: TopicsListProps) {
    const navigate = useNavigate();
    const columns: AppTableColumn<BaseTopic>[] = [
        {
            title: 'ID',
            key: 'id',
            render: (topic) => topic.id
        },
        {
            title: 'Заголовок',
            key: 'title',
            render: (topic) => topic.title
        },
        {
            title: 'Секция',
            key: 'sectionId',
            render: (topic) => sections.find(s => s.id === topic.sectionId)?.title || '-'
        },
        {
            title: 'Премиум',
            key: 'isPremium',
            render: (topic) => topic.isPremium ? '+' : '-'
        },
        {
            title: 'Действие',
            key: 'edit',
            render: (topic) => <>
                <Button className="me-2" onClick={() => navigate(TOPIC_GEN(topic.id))}><span className="icon">edit</span></Button>
                <DeleteTopicButton topicId={topic.id} />
            </>
        }
    ];
    return (
        <AppTable loading={loading} items={data || []} columns={columns} summary={[
            {
                title: 'Всего тем',
                value: data.length || 0
            },
            {
                title: 'Премиум тем',
                value: data.filter(u => u.isPremium).length || 0
            }
        ]} />
    )
}