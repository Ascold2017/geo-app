import { Button } from "react-bootstrap";
import { useAuthModel } from "@entities/auth";
import { AUTH_PATH, useConfirmModel } from "@shared";

export function LogoutButton() {
    const {openConfirm} = useConfirmModel();
    const logout = useAuthModel(s => s.logout)
    function onLogout() {
        openConfirm({
            title: 'Выход',
            text: 'Вы уверены, что хотите выйти?',
            okText: 'Да',
            cancelText: 'Нет',
            onOk: () => {
                logout()
                location.href = AUTH_PATH;
            }
        })
    }
    return (
        <Button onClick={onLogout} variant="danger">Выйти</Button>
    )
}