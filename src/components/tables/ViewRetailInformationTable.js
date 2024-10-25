"use client"
import { TableArrowDown } from '@/assets/icons';
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
                            <th className="th text-left text-sm"><div><div><p>Distributon ID</p> <TableArrowDown /></div></div></th>
                            <th className="th text-left text-sm"><div><div><p>Food ID</p> <TableArrowDown /></div></div></th>
                            <th className=" th text-left text-sm"><div>Location <TableArrowDown /></div></th>
                            <th className=" th  text-sm"><div>Price <TableArrowDown /></div></th>
                            <th className=" th  text-sm"><div>Quantity <TableArrowDown /></div></th>
                            <th className=" th text-left text-sm"><div>Received Date <TableArrowDown /></div></th>
                            <th className=" th  text-sm"><div>Sell Date <TableArrowDown /></div></th>
                            <th className=" th  text-sm"><div>Expire Date <TableArrowDown /></div></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !result ?
                                retails?.map(table_data => <tr key={table_data?.id} className='border-b border-[#EDF2F7] last:border-none'>
                                    <td className="td text-[#131D26] ">{parseInt(table_data?.distributorId?._hex, 16)}</td>
                                    <td className="td text-[#131D26] ">{parseInt(table_data?.foodId?._hex, 16)}</td>
                                    <td className="td  text-[#131D26]">{table_data?.location}</td>
                                    <td className="td  text-[#131D26]">{table_data?.receivedDate}</td>
                                    <td className="td  text-[#131D26]">{table_data?.sendDate}</td>
                                    <td className="td  text-[#131D26]">{table_data?.location}</td>
                                    <td className="td  text-[#131D26]">{parseInt(table_data?.price?._hex, 16)}</td>
                                    <td className="td  text-[#131D26]">{parseInt(table_data?.quantity?._hex, 16)}</td>
                                    <td className="td  text-[#131D26]">{table_data?.expireDate}</td>

                                </tr>)
                                :
                                <tr className='border-b border-[#EDF2F7] last:border-none'>
                                    <td className="td text-[#131D26] ">{retails?.retailId}</td>
                                    <td className="td text-[#131D26] ">{parseInt(retails?.distributorId?._hex, 16)}</td>
                                    <td className="td text-[#131D26] ">{parseInt(retails?.foodId?._hex, 16)}</td>
                                    <td className="td  text-[#131D26]">{retails?.location}</td>
                                    <td className="td  text-[#131D26]">{parseInt(retails?.price?._hex, 16)}</td>
                                    <td className="td  text-[#131D26]">{parseInt(retails?.quantity?._hex, 16)}</td>
                                    <td className="td  text-[#131D26]">{retails?.receivedDate}</td>
                                    <td className="td  text-[#131D26]">{retails?.sellDate}</td>
                                    <td className="td  text-[#131D26]">{retails?.expireDate}</td>

                                </tr>
                        }
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default ViewRetailInformationTable;
