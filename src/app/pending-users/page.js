'use client'
import AllUsersTable from '@/components/tables/AllUsersTable'
import PendingUsersTable from '@/components/tables/PendingUsersTable'
import Breadcrumb from '@/components/utils/Breadcrumb'
import NoDataFound from '@/components/utils/NoDataFound'
import { Web3Context } from '@/context/Web3Context'
import UserLayout from '@/layouts/UserLayout'
import { Skeleton } from 'antd'
import React, { useContext, useEffect } from 'react'

const PendingUsers = () => {
    const { loading, pendingUsers, fetchPendingUsers } = useContext(Web3Context);
    console.log("pending x", pendingUsers);

    useEffect(() => {
        fetchPendingUsers()
    }, [])
    return (
        <UserLayout>
            <Breadcrumb title='Pending Users' path='Dashboard / Pending Users' />
            {
                loading ? <div className='bg-white px-4 py-4 mt-4'><Skeleton active /> </div> :
                    pendingUsers?.length > 0 ? <PendingUsersTable users={pendingUsers} /> : <NoDataFound />

            }
        </UserLayout>
    )
}

export default PendingUsers