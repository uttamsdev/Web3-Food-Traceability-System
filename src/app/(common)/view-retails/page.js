'use client'
import ViewDistributionTable from '@/components/tables/ViewDistributionTable'
import ViewRetailInformationTable from '@/components/tables/ViewRetailInformationTable'
import Breadcrumb from '@/components/utils/Breadcrumb'
import NoDataFound from '@/components/utils/NoDataFound'
import { Web3Context } from '@/context/Web3Context'
import UserLayout from '@/layouts/UserLayout'
import { Skeleton } from 'antd'
import React, { useContext, useEffect } from 'react'

const ViewRetails = () => {
    const { loading, retails, getAllRetails } = useContext(Web3Context);
    console.log("rx", retails);

    useEffect(() => {
        getAllRetails();
    }, [])
    return (
        <UserLayout>
            <Breadcrumb title='All Retails List' path='Dashboard / View Retails' />
            {
                loading ? <div className='bg-white px-4 py-4 mt-4'><Skeleton active /> </div> :
                    retails?.length > 0 ? <ViewRetailInformationTable retails={retails} /> : <NoDataFound />

            }
        </UserLayout>
    )
}

export default ViewRetails