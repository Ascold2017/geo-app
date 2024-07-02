import { BrowserView, MobileView } from "react-device-detect";
import { UserLayoutSettingsDropdown } from "./UserLayoutSettingsDropdown";
import { AppMenu, AppMenuItem } from "@shared";

export function UserLayoutHeader({ menuList }: { menuList: AppMenuItem[] }) {


    return (
        <header className="navbar bg-primary text-white">

            <BrowserView className="flex items-center w-full" >
                <img src={'/favicon-32x32.png'} className="block mr-3"></img>
                <h2 className="app-title-2">GEO App</h2>
                <AppMenu items={menuList} className="flex-1" />

                <UserLayoutSettingsDropdown />

            </BrowserView>

            <MobileView className="flex items-center w-full">
                <img src={'/favicon-32x32.png'} className="block mr-3"></img>
                <h2 className="app-title-2">GEO App</h2>
                <span className="ml-auto"></span>

                <UserLayoutSettingsDropdown />
            </MobileView>

        </header>
    )

}