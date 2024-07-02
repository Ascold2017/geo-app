import React from 'react';
import { AppModal } from '@shared';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useConfirmModel } from '../model/confirm';


export const ConfirmModal: React.FC = () => {
    const { closeConfirm, isOpen, confirm } = useConfirmModel();

    return (
        <AppModal value={isOpen}>
            <div className="p-4">
                <h5 className="app-title-2 mb-3"><ExclamationCircleFilled /> {confirm.title}</h5>
                <p className='app-text-1 mb-3'>{confirm.text}</p>
                <div className='grid grid-cols-2 gap-3'>
                    <button className="btn block w-full" onClick={confirm.onOk}>{confirm.okText}</button>
                    <button className="btn block w-full" onClick={closeConfirm}>{confirm.cancelText}</button>
                </div>
            </div>
        </AppModal>
    );
};