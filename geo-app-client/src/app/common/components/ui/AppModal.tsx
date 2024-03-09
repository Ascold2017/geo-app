import React from 'react';

interface AppModalProps {
    value: boolean;
    children: React.ReactNode;
}

const AppModal: React.FC<AppModalProps> = ({ value, children }) => {
    return (
        <dialog className={`modal ${value ? 'modal-open' : ''}`}>
            <div className="modal-box">
                {children}
            </div>
        </dialog>
    );
};

export default AppModal;