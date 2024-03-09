import { useMount } from 'ahooks';
import React from 'react';
import { SectionsList } from '@widgets/sections-list';
import { useSectionsModel } from '@entities/sections';

const SectionsPage: React.FC = () => {
    const { getSections, loading, sections } = useSectionsModel()
    useMount(() => {
        getSections();
    })
    return (
        <div>
            <h2 className='mb-3'>Секции</h2>
            <SectionsList data={sections} loading={loading}  />
        </div>
    );
};

export default SectionsPage;