import { Link } from "react-router-dom";

export type AppMenuItem = { title?: string, icon?: React.ReactNode, link: string }
export type AppMenuProps = {
    items: AppMenuItem[],
    mobile?: boolean;
}
const AppMenu = ({ items, mobile, className, ...props }: AppMenuProps & React.HTMLProps<HTMLUListElement>) => {
    return <ul className={`menu menu-horizontal ${className || ''}`} {...props}>
        {items.map((item, i) => <li key={i}>
            <Link to={item.link}>{mobile && item.icon} {item.title}</Link>
        </li>)}
    </ul>
}

export default AppMenu;