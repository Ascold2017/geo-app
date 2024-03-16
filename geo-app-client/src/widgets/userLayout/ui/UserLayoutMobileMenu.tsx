import { MobileView } from "react-device-detect";
import { AppMenu, AppMenuItem } from "@shared";

export function UserLayoutMobileMenu({ menuList }: { menuList: AppMenuItem[] }) {
    
    return (
        <MobileView className="navbar navbar-center bg-primary text-white fixed bottom-0 justify-center">
            <AppMenu mobile items={menuList} />
        </MobileView>
    )
}