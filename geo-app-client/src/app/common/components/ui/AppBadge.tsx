import React, { HTMLProps } from 'react';

type AppBadgeProps = {
    text: string;
    color: string;
};

const AppBadge: React.FC<AppBadgeProps & HTMLProps<HTMLSpanElement>> = ({ text, color, className, ...props }) => {
    return (
        <span
            {...props}
            className={`badge badge-${color} ${className || ''}`}
        >
            {text}
        </span>
    );
};

export default AppBadge;