import React, { HTMLProps } from 'react';

interface CheckboxProps {
    checked: boolean;
    label: string;
    onChecked: (value: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps & HTMLProps<HTMLDivElement>> = ({ checked, label, onChecked, ...props }) => {
    return (
        <div className={`form-control ${props.className || ''}`} {...props}>
            <label className="label cursor-pointer">
                <span className="label-text mr-2">{label}</span>
                <input type="checkbox" checked={checked}
                    onChange={(e) => onChecked(e.target.checked)} className="checkbox" />
            </label>
        </div>

    );
};

export default Checkbox;