import { useMount } from 'ahooks';
import React from 'react';

import { UsersList } from '@widgets/users-list';
import { useUserModel } from '@entities/user';

const UsersPage: React.FC = () => {
    const { users, loading, getUsers }  = useUserModel();
    useMount(() => getUsers());

    return (
        <div>
            <h2 className='mb-3'>Пользователи</h2>
            <UsersList data={users} loading={loading}/>
        </div>
    );
};

export default UsersPage;