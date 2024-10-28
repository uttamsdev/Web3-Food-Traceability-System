'use client'
import ViewRetailInformationTable from '@/components/tables/ViewRetailInformationTable'
import Breadcrumb from '@/components/utils/Breadcrumb'
import NoDataFound from '@/components/utils/NoDataFound'
import { Web3Context } from '@/context/Web3Context'
import UserLayout from '@/layouts/UserLayout'
import { Skeleton } from 'antd'
import React, { useContext, useEffect, useState } from 'react'

const MyRetails = () => {
    const { loading, currentAccount, retails, getAllRetails } = useContext(Web3Context);
    const [myRetails, setMyRetails] = useState([]);
    console.log("crops", retails);

    useEffect(() => {
        getAllRetails();
    }, [])
    useEffect(() => {
        if (retails?.length > 0) {
            const myCrop = retails?.filter(retail => (retail?.retailer).toLowerCase() === currentAccount);
            setMyRetails(myCrop);
        }
    }, [retails, currentAccount])
    console.log(currentAccount)
    return (
        <UserLayout>
            <Breadcrumb title='My Retail List' path='Dashboard / My Retails' />
            {
                loading ? <div className='bg-white px-4 py-4 mt-4'><Skeleton active /> </div> :
                    myRetails?.length > 0 ? <ViewRetailInformationTable retails={myRetails} /> : <NoDataFound />

            }
        </UserLayout>
    )
}

export default MyRetails