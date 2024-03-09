import { Button } from "react-bootstrap";
import { useTopicsModel } from "@entities/topics";
import { useConfirmModel } from "@shared";


export interface DeleteTopicButtonProps {
    topicId: number;
}
export function DeleteTopicButton({ topicId}: DeleteTopicButtonProps) {
    const openConfirm = useConfirmModel(state => state.openConfirm);
    const { deleteTopic } = useTopicsModel()
    const deleteConfirm = () => {
        openConfirm({
            title: 'Удаление урока',
            text: 'Вы уверены что хотите удалить?',
            okText: 'Да, удалить урок',
            cancelText: 'Нет',
            onOk() {
                deleteTopic(topicId)
            }
        })
    }
    return (
        <Button variant="danger" onClick={deleteConfirm}><span className="icon">delete</span></Button>
    )
}