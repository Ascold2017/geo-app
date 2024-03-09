import { useState } from "react";
import { Button, Form, Stack } from "react-bootstrap";
import { UploadImage } from "@features/uploadImage";
import { BaseSection } from "@entities/sections";

type Props = {
    section: BaseSection;
    onSave: (section: BaseSection) => void;
    onClose: () => void
}
export default function SectionModal({ section, onSave, onClose }: Props) {
    const [title, setTitle] = useState(section.title)
    const [imageUrl, setImageUrl] = useState(section.imageUrl || '');

    const save = () => {
        onSave({
            id: section.id,
            title,
            imageUrl
        })
    }
    
    return <>
        <Form.Control title="Название секции" value={title} onChange={(e) => setTitle(e.target.value)} className="mb-3" />
        <UploadImage imageUrl={imageUrl} onChange={setImageUrl} className="mb-3"/>
        <Stack direction="horizontal">
            
            <Button variant="error" onClick={onClose} className="mr-3">Закрыть</Button>
            <Button onClick={save}>Сохранить</Button>
        </Stack>

    </>
}
// 