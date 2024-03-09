import { useMount } from "ahooks";
import { useParams } from "react-router-dom";
import { TopicForm } from "@widgets/topic-form";
import { useSectionsModel } from "@entities/sections";
import { useTopicsModel } from "@entities/topics";


export default function EditTopicPage () {
    const { id } = useParams()
    const { getTopic } = useTopicsModel();
    const { getSections } = useSectionsModel();
    useMount(() => {
        getTopic(+id!)
        getSections()
    })
    return <TopicForm/>
}