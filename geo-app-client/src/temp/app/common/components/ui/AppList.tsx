import React, { HTMLProps } from 'react';

type AppListProps<T> = {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
};

const AppList = <T,>({ items, renderItem, ...props }: AppListProps<T> & HTMLProps<HTMLDivElement>) => {
    return (
        <div className={`flex flex-col space-y-4 ${props.className || ''}`} {...props} >
            {items.map((item, index) => (
                <div key={index} className="app-card mb-3">
                    {renderItem(item)}
                </div>
            ))}
        </div>
    );
};

export default AppList;