"use client"
import { TableArrowDown } from '@/assets/icons';
import Link from 'next/link';
import React, { useState } from 'react';

const ViewRetailInformationTable = ({ retails, result = false }) => {
    console.log('re', retails)
    return (
        <div className='bg-white rounded-[6px]'>
            <div className='mt-4  w-full px-3 pt-3 overflow-x-auto max-h-[600px] overflow-y-auto'>
                <table className="min-w-full ">
                    <thead>
                        <tr className='border-b border-[#EDF2F7]'>
                            <th className="th text-left text-sm"><div><div><p>Retailed ID</p> <TableArrowDown /></div></div></th>
                            <th className=" th text-left text-sm"><div>Location <TableArrowDown /></div></th>
                            <th className=" th  text-sm"><div>Price(/Pcs)<TableArrowDown /></div></th>
                            <th className=" th  text-sm"><div className={`${result && 'flex justify-end'}`}>Quantity <TableArrowDown /></div></th>
                            <th className=" th text-left text-sm "><div className={`${result && 'flex justify-end'}`}>Received Date <TableArrowDown /></div></th>
                            <th className=" th  text-sm flex justify-end"><div>Sell Date <TableArrowDown /></div></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !result ?
                                retails?.map(table_data => <tr key={table_data?.id} className='border-b border-[#EDF2F7] last:border-none'>
                                    <td className="td text-[#131D26] "><Link href={`/trace-food/${table_data?.retailId}`} className='hover:underline hover:text-blue-700'>{table_data?.retailId}</Link></td>
                                    <td className="td  text-[#131D26]">{table_data?.location}</td>
                                    <td className="td  text-[#131D26]">{parseInt(table_data?.price?._hex, 16)}</td>
                                    <td className="td  text-[#131D26] ">{parseInt(table_data?.quantity?._hex, 16)}</td>
                                    <td className="td  text-[#131D26] ">{table_data?.receivedDate}</td>
                                    <td className="td  text-[#131D26] text-end">{table_data?.sellDate}</td>

                                </tr>)
                                :
                                <tr className='border-b border-[#EDF2F7] last:border-none'>
                                    <td className="td text-[#131D26] ">{retails?.retailId}</td>
                                    <td className="td  text-[#131D26]">{retails?.location}</td>
                                    <td className="td  text-[#131D26]">{parseInt(retails?.price?._hex, 16)}</td>
                                    <td className="td  text-[#131D26] text-end">{parseInt(retails?.quantity?._hex, 16)}</td>
                                    <td className="td  text-[#131D26] text-end">{retails?.receivedDate}</td>
                                    <td className="td  text-[#131D26] text-end">{retails?.sellDate}</td>

                                </tr>
                        }
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default ViewRetailInformationTable;
