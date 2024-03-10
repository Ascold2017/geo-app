import { useAppModel } from '@app/model';
import {  useTopicsModel } from '@entities/topics'
import { AppSpin } from '@shared';
import { useRequest } from 'ahooks';
import { useEffect } from 'react';
import { TopicCard } from './TopicCard';


export function TopicsList() {
    const { getTopics, topics } = useTopicsModel()
    
    const user = useAppModel(s => s.user);

    const { loading, error, runAsync } = useRequest(getTopics, { manual: true })

    useEffect(() => {
        if (user.currentSectionId) {
            runAsync();
        }
    }, [runAsync, user.currentSectionId]);


    if (loading && !topics) return <AppSpin spinning />
    if (error) return <p className="app-text-1">Произошла ошибка: {error?.message}</p>
    return <>
        <AppSpin spinning={loading} />
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {topics?.map(topic => <TopicCard key={topic.id} topic={topic} />)}
        </section>
    </>;
}