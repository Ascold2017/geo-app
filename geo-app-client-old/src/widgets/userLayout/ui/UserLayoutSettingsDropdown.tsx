import { SettingFilled } from "@ant-design/icons";
import { useUserModel } from "@entities/user";
import { LogoutButton } from "@features/auth";
import { SelectSection } from "@features/selectSection";
import { AppDropdown } from "@shared";

export function UserLayoutSettingsDropdown() {
    const user = useUserModel(s => s.user)
    return (
        <AppDropdown
            activator={<SettingFilled />}
        >
            <div className="card w-56 bg-base-100 px-3 py-3 z-10">
                <div className="app-text-2 text-white">Пользователь: {user?.username}</div>
                <div className="app-text-2 text-white mb-3">Аккаунт: {user?.isPremium ? 'Premium' : 'Обычный'}</div>
                <SelectSection />
                <div className="divider" />
                <LogoutButton />
            </div>
        </AppDropdown>
    )

    // 
}