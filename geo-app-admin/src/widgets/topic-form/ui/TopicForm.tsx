import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSectionsModel } from "@entities/sections";
import { useTasksModel } from "@entities/tasks";
import { useTopicsModel } from "@entities/topics";

import {TOPIC_GEN, youtubeLinkParser} from "@shared";
import TasksList from "./TasksList";


export function TopicForm() {
    const { topic, isNew, setTopicValue, saveTopic } = useTopicsModel();
    const { tasks, markDeleteTask, markSaveTask } = useTasksModel()
    const navigate = useNavigate();
    const { sections } = useSectionsModel();


    const youtubeLink = topic.videoId ? `https://www.youtube.com/embed/${topic.videoId}` : '';
    const setYoutubeLink = (v: string) => {
        const id = youtubeLinkParser(v);
        id && setTopicValue('videoId', id)
    }


    async function save() {
        const id = await saveTopic()
        if (isNew) {
            navigate(TOPIC_GEN(id))
        }
    }


    return (
        <Card className="py-4">
            <Container>
                <Row className="mb-4">
                    <Col className="d-flex"><Button className="ms-auto" onClick={save}>Сохранить тему</Button></Col>
                </Row>
                <Row className="mb-4">
                    <Col>
                        <Form.Control
                            value={topic.title}
                            onChange={(e) => setTopicValue('title', e.target.value)}
                            placeholder="Название урока"
                            title="Название урока"
                        />
                    </Col>
                    <Col>
                        <Form.Select
                            value={topic.sectionId}
                            onChange={(sectionId) => setTopicValue('sectionId', sectionId)}
                            title="Секция"
                        >
                            {sections?.map((section) => (<option key={section.id} value={section.id}>{section.title}</option>))}
                        </Form.Select>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col>
                        <Form.Control
                            value={youtubeLink}
                            onChange={(e) => setYoutubeLink(e.target.value)}
                            placeholder="Youtube ссылка"
                            title="Youtube ссылка"
                            className="mb-3"
                        />
                    </Col>
                    <Col>
                        <Form.Check
                            type="switch"
                            checked={topic.isPremium}
                            onChange={(isPremium) => setTopicValue('isPremium', isPremium)}
                            label="Только для премиум-пользователей"
                        />
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col>
                        <Form.Control
                            placeholder="Текстовая версия урока"
                            className="mb-3"
                            value={topic.text}
                            onChange={(e) => setTopicValue('text', e.target.value)}
                            as="textarea" rows={3}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TasksList items={tasks} onSaveItem={(t) => markSaveTask(t)} onDeleteItem={(intId) => markDeleteTask(intId)} />
                    </Col>
                </Row>
            </Container>
        </Card>
    )
}
