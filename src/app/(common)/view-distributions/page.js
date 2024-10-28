'use client'
import ViewDistributionTable from '@/components/tables/ViewDistributionTable'
import Breadcrumb from '@/components/utils/Breadcrumb'
import NoDataFound from '@/components/utils/NoDataFound'
import { Web3Context } from '@/context/Web3Context'
import UserLayout from '@/layouts/UserLayout'
import { Skeleton } from 'antd'
import React, { useContext, useEffect, useState } from 'react'

const ViewDistributions = () => {
    const { loading, distributions, fetchAllDistributions, currentAccount } = useContext(Web3Context);
    console.log("x", distributions);
    const [myDestribution, setMyDestribution] = useState([]);

    useEffect(() => {
        fetchAllDistributions();
    }, [])

    useEffect(() => {
        if (distributions?.length > 0) {
            setMyDestribution(distributions?.filter(item => (item?.retailer)?.toLowerCase() === currentAccount));
        }
    }, [distributions, currentAccount])


    return (
        <UserLayout>
            <Breadcrumb title='Distribution List' path='Dashboard / View Distribution' />
            {
                loading ? <div className='bg-white px-4 py-4 mt-4'><Skeleton active /> </div> :
                    myDestribution?.length > 0 ? <ViewDistributionTable distributions={myDestribution} /> : <NoDataFound />

            }
        </UserLayout>
    )
}

export default ViewDistributions