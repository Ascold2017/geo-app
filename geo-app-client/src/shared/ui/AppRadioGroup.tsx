import React from 'react';

type RadioItem<T> = {
    label: string;
    value: T;
};

type AppRadioGroupProps<T> = {
    buttons?: boolean;
    value: T;
    onChanged: (value: T) => void;
    items: RadioItem<T>[];
    className?: string;
};

export const AppRadioGroup = <T,>({ value, onChanged, items, buttons, className }: AppRadioGroupProps<T>) => {

    return (
        <div className={`flex items-center ${className || ''}`}>
            {items.map((item) => (
                <label key={item.value as string} className='flex items-center mr-3'>
                    <input
                        className={`${buttons ? 'btn' : 'radio' } mr-3`}
                        type="radio"
                        value={item.value as string | number}
                        checked={value === item.value}
                        aria-label={item.label}
                        onChange={() => onChanged(item.value)}
                    />
                    {!buttons && item.label}
                </label>
            ))}
        </div>
    );
};
