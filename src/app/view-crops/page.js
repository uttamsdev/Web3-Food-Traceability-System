'use client'
import AllUsersTable from '@/components/tables/AllUsersTable'
import ViewCropsTable from '@/components/tables/ViewCropsTable'
import Breadcrumb from '@/components/utils/Breadcrumb'
import NoDataFound from '@/components/utils/NoDataFound'
import { Web3Context } from '@/context/Web3Context'
import UserLayout from '@/layouts/UserLayout'
import { Skeleton } from 'antd'
import React, { useContext, useEffect } from 'react'

const ViewCrops = () => {
    const { loading, crops, fetchAllCrops } = useContext(Web3Context);
    console.log("crops", crops);

    useEffect(() => {
        fetchAllCrops();
    }, [])
    return (
        <UserLayout>
            <Breadcrumb title='View Crop List' path='Dashboard / View Crops' />
            {
                loading ? <div className='bg-white px-4 py-4 mt-4'><Skeleton active /> </div> :
                    crops?.length > 0 ? <ViewCropsTable crops={crops} /> : <NoDataFound />

            }
        </UserLayout>
    )
}

export default ViewCrops