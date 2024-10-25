'use client'
import UsedCropsTable from '@/components/tables/UsedCropsTable';
import ViewFoodsTable from '@/components/tables/VewFoodsTable';
import ViewDistributionTable from '@/components/tables/ViewDistributionTable';
import ViewRetailInformationTable from '@/components/tables/ViewRetailInformationTable';
import { Web3Context } from '@/context/Web3Context';
import { Skeleton } from 'antd';
import { useParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const TraceFood = () => {
    const { getFoodTrace, allUsers, loading, foodTrace } = useContext(Web3Context);
    const [foodId, setFoodId] = useState('');
    const { id } = useParams();

    const handleFoodSearch = () => {
        if (!foodId) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please enter a valid Food ID to search!',
            });
            return;
        }
        getFoodTrace(foodId);
    };

    useEffect(() => {
        if (!foodId) {
            getFoodTrace(id);
        }
    }, []);

    return (
        <div className='w-full bg-[#A7A19E0D] min-h-screen'>
            <h1 className='text-center text-[#A1045A] text-2xl font-semibold pt-6'>
                Welcome to Food Traceability System
            </h1>
            <p className='text-base text-center text-[#62646c]'>
                We ensure high security of food safety for you. Thanks for using our system.
            </p>
            <div className='mt-2'>
                <div className='flex items-center bg-white max-w-[600px] mx-auto h-[40px] px-2 py-1.5 rounded-[8px]'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#A1045A]" fill="none">
                        <path d="M17.5 17.5L22 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                    </svg>
                    <input
                        onChange={(e) => setFoodId(e.target.value)}
                        type="  "
                        placeholder="Search Food ID"
                        className='w-full focus:!border-none !border-none block border border-[#A1045A] p-2 rounded-md'
                    />
                    <button
                        onClick={handleFoodSearch}
                        className='bg-[#A1045A] h-[34px] px-5 py-1.5 rounded text-white flex items-center justify-center'
                    >
                        Search
                    </button>
                </div>
            </div>
            <div>
                {loading ? (
                    <div className='container mt-8 mx-auto flex flex-col gap-2 px-5 py-5'>
                        <Skeleton active />
                        <Skeleton active />
                        <Skeleton active />
                        <Skeleton active />
                        <Skeleton active />
                        <Skeleton active />
                    </div>
                ) : foodTrace ? (
                    foodTrace.length > 0 ? (
                        <div className='container mx-auto mt-8'>
                            <div>
                                <p className='underline text-[#A1045A] text-base font-semibold mb-[-8px]'>
                                    Food Producer Information:
                                </p>
                                <ViewFoodsTable users={allUsers} foods={foodTrace[0]} result={true} />
                            </div>

                            <div className='my-8'>
                                <p className='underline text-[#A1045A] text-base font-semibold mb-[-8px]'>
                                    Used Crops for the food:
                                </p>
                                <UsedCropsTable crops={foodTrace[3]} users={allUsers} />
                            </div>

                            <div className='my-8'>
                                <p className='underline text-[#A1045A] text-base font-semibold mb-[-8px]'>
                                    Food Distribution Information:
                                </p>
                                <ViewDistributionTable distributions={foodTrace[1]} result={true} />
                            </div>

                            <div className='my-8'>
                                <p className='underline text-[#A1045A] text-base font-semibold mb-[-8px]'>
                                    Food Retail Information:
                                </p>
                                <ViewRetailInformationTable retails={foodTrace[2]} result={true} />
                            </div>
                        </div>
                    ) : (
                        <div className='container mx-auto mt-8 text-center'>
                            <p className='text-lg text-[#A1045A] font-semibold'>
                                No food trace data found for the provided ID.
                            </p>
                        </div>
                    )
                ) : (
                    <div className={`container mx-auto mt-10 text-center`}>
                        <p className='text-lg text-[#f06969] font-medium'>
                            No food trace data found for the provided ID.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TraceFood;
