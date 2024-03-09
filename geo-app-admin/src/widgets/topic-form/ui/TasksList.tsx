import { useState } from "react";
import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";

import {UploadImage} from "@features/uploadImage";
import { IntTask, TaskTypesEnum } from '@entities/tasks'
import { AppTable, AppTableColumn, useConfirmModel } from "@shared";

import VoiceRecorder from './VoiceRecorder'

const defaultTask: IntTask = {
    id: 0,
    _intId: "",
    type: TaskTypesEnum.WORD,
    ka: '',
    ru: '',
    transcription: '',
    soundUrl: '',
    imageUrl: ''
}

type Props = {
    items: IntTask[];
    onSaveItem: (item: IntTask) => void;
    onDeleteItem: (intId: string) => void;
}
export default function ListForm({ items, onSaveItem, onDeleteItem }: Props) {
    const [item, setItem] = useState<IntTask>(defaultTask);
    const setItemKa = (v: string) => setItem({ ...item, ka: v });
    const setItemRu = (v: string) => setItem({ ...item, ru: v });
    const setItemTrans = (v: string) => setItem({ ...item, transcription: v });
    const setItemType = (v: TaskTypesEnum) => setItem({ ...item, type: v })
    const setItemSoundBase64 = (soundUrl: string) => setItem({ ...item, soundUrl });
    const setItemImageBase64 = (imageUrl: string) => setItem({ ...item, imageUrl });
    const openConfirm = useConfirmModel(s => s.openConfirm)

    const deleteConfirm = (id: string) => {
        openConfirm({
            title: 'Удаление упражнения',
            text: 'Вы уверены что хотите удалить?',
            okText: 'Да, удалить урок',
            cancelText: 'Нет',
            onOk() {
                deleteItem(id)
            }
        })
    }
    async function saveItem() {
        onSaveItem(item);
        resetItem();
    }

    function resetItem() {
        setItem(defaultTask);
    }

    const isItemDisabled = (id: string) => id.startsWith('delete_')

    const selectItem = (id: string) => !isItemDisabled(id) && setItem(items.find(i => i._intId === id)!);
    const deleteItem = (id: string) => onDeleteItem(id);

    const columns: AppTableColumn<IntTask>[] = [
        {
            title: 'Картинка',
            key: 'imageUrl',
            render(task) {
                if (!task.imageUrl) return '-'
                return <img src={task.imageUrl} style={{ width: '100%', maxWidth: '100px' }} />
            },
        },
        {
            title: 'KA',
            key: 'ka',
            render: (task) => task.ka,
        },
        {
            title: 'RU',
            key: 'ru',
            render: (task) => task.ru,
        },
        {
            title: 'Транскрипция',
            key: 'transcription',
            render: (task) => task.transcription,
        },
        {
            title: 'Действие',
            key: 'edit',
            render: (task) => <>
                <Button className="me-2" onClick={() => selectItem(task._intId)}><span className="icon">edit</span></Button>
                <Button variant="danger" onClick={() => deleteConfirm(task._intId)}><span className="icon">delete</span></Button>
            </>
        },
    ];

    return <>
        <Container>
            <Row className="mb-4">
                <Col>
                    <Stack direction="horizontal">
                        <h4>Упражнения темы</h4>
                        <Form.Group className="ms-auto">
                            <Form.Check
                                type="radio"
                                label="Буква"
                                value={TaskTypesEnum.LETTER}
                                checked={item.type === TaskTypesEnum.LETTER}
                                onChange={() => setItemType(TaskTypesEnum.LETTER)}
                                inline
                            />
                            <Form.Check
                                type="radio"
                                label="Слово"
                                value={TaskTypesEnum.WORD}
                                checked={item.type === TaskTypesEnum.WORD}
                                onChange={() => setItemType(TaskTypesEnum.WORD)}
                                inline
                            />
                            <Form.Check
                                type="radio"
                                label="Предложение"
                                value={TaskTypesEnum.SENTENCE}
                                checked={item.type === TaskTypesEnum.SENTENCE}
                                onChange={() => setItemType(TaskTypesEnum.SENTENCE)}
                                inline
                            />
                        </Form.Group>
                        <Button className="ms-3 me-3" onClick={saveItem}>Сохранить</Button>
                        <Button variant="warning" onClick={resetItem}>Сбросить</Button>
                    </Stack>

                </Col>
            </Row>
            <Row className="mb-4">
                <Col>
                    <UploadImage imageUrl={item.imageUrl || ''} onChange={setItemImageBase64} />
                    <VoiceRecorder title="" base64Data={item.soundUrl || ''} onChange={setItemSoundBase64} />
                </Col>

            </Row>
            <Row>
                <Col>
                    <Form.Control className="mb-4" as="textarea" value={item.ka} onChange={(e) => setItemKa(e.target.value)} placeholder="Слово (ka)" title="Слово (ka)" />
                    <Form.Control className="mb-4" as="textarea" value={item.ru} onChange={(e) => setItemRu(e.target.value)} placeholder="Слово (ru)" title="Слово (ru)" />
                    <Form.Control className="mb-4" as="textarea" value={item.transcription} onChange={(e) => setItemTrans(e.target.value)} placeholder="Слово (transcription)" title="Слово (transcription)" />

                </Col>
            </Row>
        </Container>

        <AppTable items={items} columns={columns} />
    </>
}