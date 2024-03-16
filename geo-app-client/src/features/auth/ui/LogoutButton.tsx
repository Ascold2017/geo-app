import { useConfirmModel } from "@features/confirm";
import { useAuthModel } from "../model";
import { useNavigate } from "react-router-dom";
import { AUTH_PATH } from "@shared";

export function LogoutButton() {
    const logout = useAuthModel(state => state.logout);
    const openConfirm = useConfirmModel(s => s.openConfirm);
    const navigate = useNavigate();
    
    function onLogout() {
        openConfirm({
            title: 'Выход',
            text: 'Вы уверены, что хотите выйти?',
            okText: 'Да',
            cancelText: 'Нет',
            onOk: () => {
                logout()
                navigate(AUTH_PATH)
            }
        })
    }
    return  <button onClick={onLogout} className="btn btn-error block w-full">Выйти</button>
}