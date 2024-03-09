import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { BaseSection, useSectionsModel } from "@entities/sections";
import SectionModal from "./EditSectionModal";

export interface EditSectionButtonProps {
    sectionId: number;
}
export function EditSectionButton({ sectionId }: EditSectionButtonProps) {
    const [selectedSection, setSelectedSection] = useState<BaseSection | null>(null);
    const { sections, saveSection } = useSectionsModel()
    const openSection = (sectionId: number) => {
        if (sectionId === 0) {
            setSelectedSection({
                id: 0,
                title: '',
                imageUrl: ''
            })
        } else {
            const section = sections.find(s => s.id === sectionId)
            section && setSelectedSection(section)
        }

    }

    const save = async (section: BaseSection) => {
        await saveSection(section)
        setSelectedSection(null);
    }
    return (
        <>
            <Button onClick={() => openSection(sectionId)} className="me-3"><span className="icon">edit</span></Button>
            <Modal show={!!selectedSection}>
                <Modal.Body>
                    {selectedSection && <SectionModal section={selectedSection} onSave={save} onClose={() => setSelectedSection(null)} />}
                </Modal.Body>
            </Modal>
        </>

    )
}