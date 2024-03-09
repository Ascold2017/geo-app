import { Button } from "react-bootstrap";
import { useSectionsModel } from "@entities/sections";
import { useConfirmModel } from "@shared";


export interface DeleteSectionButtonProps {
    sectionId: number;
}
export function DeleteSectionButton ({ sectionId }: DeleteSectionButtonProps) {
    const openConfirm = useConfirmModel(s => s.openConfirm);
    const { deleteSection } = useSectionsModel();
    const deleteConfirm = () => {
        openConfirm({
            title: 'Удаление cекции',
            text: 'Вы уверены что хотите удалить?',
            okText: 'Да, удалить секцию',
            cancelText: 'Нет',
            async onOk() {
                await deleteSection(sectionId)
            }
        })
    }
    return (
        <Button variant="danger" onClick={deleteConfirm} ><span className="icon">delete</span></Button>
    )
}