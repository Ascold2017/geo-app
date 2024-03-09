import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useConfirmModel } from '../model/confirm';


export const AppConfirm: React.FC = () => {
    const { closeConfirm, isOpen, confirm } = useConfirmModel();

    return (
        <Modal show={isOpen}>
            <div className="p-4">
                <h5 className="mb-3"><i className='icon'></i> {confirm.title}</h5>
                <p className='mb-3'>{confirm.text}</p>
                <div className='d-flex'>
                    <Button className='ms-auto me-3' onClick={confirm.onOk}>{confirm.okText}</Button>
                    <Button onClick={closeConfirm}>{confirm.cancelText}</Button>
                </div>
            </div>
        </Modal>
    );
};