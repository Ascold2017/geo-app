import { useMount } from 'ahooks';
import React from 'react';

import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { TopicsList } from '@widgets/topics-list';
import { useSectionsModel } from '@entities/sections';
import { useTopicsModel } from '@entities/topics';

import { NEW_TOPIC } from '@shared';


const TopicListPage: React.FC = () => {
    const navigate = useNavigate();
    const { getTopics, loading, topics } = useTopicsModel()
    const { getSections, sections } = useSectionsModel()
    useMount(() => {
        getSections();
        getTopics();
    })
    return (
        <div>

            <div className="d-flex mb-3">
                <h2>Темы</h2>
                <Button className='ms-auto' onClick={() => navigate(NEW_TOPIC)}>Создать</Button>
            </div>
            <TopicsList data={topics} loading={loading} sections={sections} />
        </div>
    );
};

export default TopicListPage;