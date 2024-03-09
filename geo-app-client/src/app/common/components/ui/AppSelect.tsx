import React from 'react';

interface AppSelectProps {
    items: { value: string | number; title: string }[];
    value: string | number | undefined;
    onChange: (e: string) => void;
}

const AppSelect: React.FC<AppSelectProps & React.HTMLProps<HTMLSelectElement>> = ({ items, value, onChange, className, ...props }) => {
    return (
        <select
            className={`select w-full max-w-xs ${className || ''}`} {...props}
            value={value}
            onChange={e => onChange(e.target.value)}
        >
            {items.map((item, index) => (
                <option key={index} value={item.value}>{item.title}</option>
            ))}
        </select>
    );
};

export default AppSelect;