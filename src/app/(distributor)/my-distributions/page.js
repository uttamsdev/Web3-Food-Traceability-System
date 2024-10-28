'use client'
import ViewDistributionTable from '@/components/tables/ViewDistributionTable'
import Breadcrumb from '@/components/utils/Breadcrumb'
import NoDataFound from '@/components/utils/NoDataFound'
import { Web3Context } from '@/context/Web3Context'
import UserLayout from '@/layouts/UserLayout'
import { Skeleton } from 'antd'
import React, { useContext, useEffect, useState } from 'react'

const ViewDistributions = () => {
    const { loading, distributions, fetchAllDistributions, allUsers, getAllUsers, currentAccount } = useContext(Web3Context);
    const [myDistribute, setMyDistribute] = useState('');

    useEffect(() => {
        fetchAllDistributions();
        getAllUsers();
    }, [])
    useEffect(() => {
        if (distributions?.length > 0) {
            setMyDistribute(distributions?.filter(item => item?.distributor?.toLowerCase() === currentAccount))
        }
    }, [distributions, currentAccount])
    return (
        <UserLayout>
            <Breadcrumb title='My Distribution List' path='Dashboard / My Distributions' />
            {
                loading ? <div className='bg-white px-4 py-4 mt-4'><Skeleton active /> </div> :
                    myDistribute?.length > 0 ? <ViewDistributionTable distributions={myDistribute} /> : <NoDataFound />

            }
        </UserLayout>
    )
}

export default ViewDistributions