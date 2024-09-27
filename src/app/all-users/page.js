import AllUsersTable from '@/components/tables/AllUsersTable'
import Breadcrumb from '@/components/utils/Breadcrumb'
import UserLayout from '@/layouts/UserLayout'
import React from 'react'

const Users = () => {
    return (
        <UserLayout>
            <Breadcrumb title='All Users' path='Dashboard / All Users' />
            <AllUsersTable />
        </UserLayout>
    )
}

export default Users