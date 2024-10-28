"use client"
import { TableArrowDown } from '@/assets/icons';
import React, { useState } from 'react';

const ViewDistributionTable = ({ distributions, result = false }) => {

    return (
        <div className='bg-white rounded-[6px]'>
            <div className='mt-4  w-full px-3 pt-3 overflow-x-auto max-h-[600px] overflow-y-auto'>
                <table className="min-w-full ">
                    <thead>
                        <tr className='border-b border-[#EDF2F7]'>
                            <th className="th text-left text-sm"><div><div><p>Distribution ID</p> <TableArrowDown /></div></div></th>
                            <th className="th text-left text-sm"><div><div><p>Food ID</p> <TableArrowDown /></div></div></th>
                            <th className=" th text-left text-sm"><div>Received Date <TableArrowDown /></div></th>
                            <th className=" th  text-sm"><div>Send Date <TableArrowDown /></div></th>
                            <th className=" th  text-sm"><div>Price <TableArrowDown /></div></th>
                            <th className=" th  text-sm"><div>Quantity <TableArrowDown /></div></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !result ?
                                distributions?.map(table_data => <tr key={table_data?.id} className='border-b border-[#EDF2F7] last:border-none'>
                                    <td className="td text-[#131D26] ">{parseInt(table_data?.distributorId?._hex, 16)}</td>
                                    <td className="td text-[#131D26] ">{parseInt(table_data?.foodId?._hex, 16)}</td>
                                    <td className="td  text-[#131D26]">{table_data?.receivedDate}</td>
                                    <td className="td  text-[#131D26]">{table_data?.sendDate}</td>
                                    <td className="td  text-[#131D26]">{parseInt(table_data?.price?._hex, 16)}</td>
                                    <td className="td  text-[#131D26]">{parseInt(table_data?.quantity?._hex, 16)}</td>

                                </tr>)
                                :
                                <tr className='border-b border-[#EDF2F7] last:border-none'>
                                    <td className="td text-[#131D26] ">{parseInt(distributions?.distributorId?._hex, 16)}</td>
                                    <td className="td text-[#131D26] ">{parseInt(distributions?.foodId?._hex, 16)}</td>
                                    <td className="td  text-[#131D26]">{distributions?.receivedDate}</td>
                                    <td className="td  text-[#131D26]">{distributions?.sendDate}</td>
                                    <td className="td  text-[#131D26]">{distributions?.location}</td>
                                    <td className="td  text-[#131D26]">{parseInt(distributions?.price?._hex, 16)}</td>
                                    <td className="td  text-[#131D26]">{parseInt(distributions?.quantity?._hex, 16)}</td>

                                </tr>
                        }
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default ViewDistributionTable;
