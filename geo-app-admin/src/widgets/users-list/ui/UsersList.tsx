import { Button } from "react-bootstrap";
import type { User } from "@entities/user";
import { AppTable, type AppTableColumn } from "../../../shared";

export interface UsersListProps {
    data: User[];
    loading: boolean;
}
export function UsersList ({ data, loading }: UsersListProps) {
    const columns: AppTableColumn<User>[] = [
        {
            title: 'ID',
            key: 'id',
            render: (item: User) => <span>{item.id}</span>
        },
        {
            title: 'Имя пользователя',
            key: 'username',
            render: (item: User) => <span>{item.username}</span>
        },
        {
            title: 'Премиум-пользователь',
            key: 'isPremium',
            render: (item: User) => <span>{item.isPremium ? '+' : '-'}</span>
        },
        {
            title: 'Зарегистрирован',
            key: 'registeredAt',
            render: (item: User) => <span>{new Date(item.registeredAt).toISOString()}</span>
        },
        {
            title: '',
            key: 'edit',
            render: () => <>
                <Button variant="light"><span className="icon">settings</span></Button>
            </>
        }
    ];

    return (
        <AppTable loading={loading} items={data || []} columns={columns} summary={[
            {
                title: 'Всего пользователей',
                value: data.length || 0
            },
            {
                title: 'Премиум пользователей',
                value: data.filter(u => u.isPremium).length || 0
            }
        ]} />
    )
}