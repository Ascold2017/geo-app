import { create } from 'zustand';
type Confirm = {
    title?: string;
    text: string;
    onOk: () => void;
    okText: string;
    cancelText: string;
};

type ConfirmStore = {
    isOpen: boolean;
    confirm: Confirm;
    openConfirm: (props: Confirm) => void;
    closeConfirm: () => void;
};

const defaultConfirm: Confirm = {
    title: undefined,
    text: '',
    onOk: () => { },
    okText: 'Да',
    cancelText: 'Нет',
};

export const useConfirmStore = create<ConfirmStore>((set) => ({
    isOpen: false,
    confirm: defaultConfirm,
    openConfirm: (props) => {
        set({
            isOpen: true,
            confirm: {
                title: props.title,
                text: props.text,
                onOk: () => {
                    props.onOk()
                    set({ isOpen: false })
                },
                okText: props.okText || defaultConfirm.okText,
                cancelText: props.cancelText || defaultConfirm.cancelText,
            },
        });
    },
    closeConfirm: () => {
        set({ isOpen: false });
    },
}));