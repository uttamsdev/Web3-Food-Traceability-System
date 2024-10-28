'use client';

import React, { useContext, useEffect, useState } from 'react';
import Breadcrumb from '@/components/utils/Breadcrumb';
import UserLayout from '@/layouts/UserLayout';
import { DatePicker, Input, Select, Space, Spin } from 'antd';
import { Web3Context } from '@/context/Web3Context';
import { LoadingOutlined } from '@ant-design/icons';
import Dropdown from '@/components/utils/CustomDropdown';

const AddFoods = () => {
    const { loading, addFoodItem, crops, fetchAllCrops, allUsers, getAllUsers, currentAccount} = useContext(Web3Context);
    const [distributors, setDistributors] = useState([]);
    const [myCrops, setMyCrops] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [expireDate, setExpireDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [dropdownValues, setDropdownValues] = useState({});
    const [selectedCrops, setSelectedCrops] = useState([]);

    const [formData, setFormData] = useState({
        foodName: '',
        location: '',
        price: '',
        quantity: ''
    });

    console.log("crops", crops);
    const [errors, setErrors] = useState({});

    const onChangeStartDate = (date, dateString) => {
        setStartDate(dateString);
        if (dateString) {
            setErrors(prev => ({ ...prev, startDate: '' })); // Clear error if valid
        }
    };

    const onChangeEndDate = (date, dateString) => {
        setEndDate(dateString);
        if (dateString) {
            setErrors(prev => ({ ...prev, endDate: '' })); // Clear error if valid
        }
    };
    const onChangeExpireDate = (date, dateString) => {
        setExpireDate(dateString);
        if (dateString) {
            setErrors(prev => ({ ...prev, endDate: '' })); // Clear error if valid
        }
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Clear error on valid input
        if (value) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleChange = (value) => {
        console.log('Selected IDs:', value); // You can see the selected IDs in the console
        setSelectedCrops(value); // Update state with the selected IDs
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.foodName) newErrors.foodName = 'Food name is required';
        if (!formData.location) newErrors.location = 'Location is required';
        if (!startDate) newErrors.startDate = 'Start date is required';
        if (!endDate) newErrors.endDate = 'End date is required';
        if (!expireDate) newErrors.expireDate = 'Expire date is required';
        if (selectedCrops.length == 0) newErrors.cropName = 'No Crops is selected';
        if (!formData.price) newErrors.price = 'Price is required';
        if (!formData.quantity) newErrors.quantity = 'Quantity is required';
        if (!dropdownValues?.distributor) newErrors.quantity = 'Distributor is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return; // Block submission if validation fails

        // Perform any form submission actions here
        addFoodItem(formData.foodName, selectedCrops, formData.location, startDate, endDate, formData.price, formData.quantity, expireDate, dropdownValues?.distributor?.wallet);
    };

    useEffect(() => {
        fetchAllCrops();
        getAllUsers();
    }, [])
    
    useEffect(() => {
        if (allUsers?.length) {
            const distributor = allUsers?.filter(user => user.role === 3);
            setDistributors(distributor);
        }
    }, [allUsers])
    useEffect(() => {
        if (crops?.length > 0) {
            setMyCrops(crops?.filter(crop => (crop?.producer).toLowerCase() === currentAccount));
        }
    }, [crops, currentAccount])
    console.log(dropdownValues?.distributor?.wallet)
    return (
        <UserLayout>
            <Breadcrumb title='Add Food' path='Dashboard / Add Foods' />
            <form
                className='mt-6 flex flex-col mx-auto gap-3 max-w-[750px] px-5 py-5 bg-white rounded'
                onSubmit={handleSubmit}
            >
                <div className='flex flex-col gap-0.5'>
                    <label className='text-base font-medium'>Food Name</label>
                    <Input
                        placeholder='Food Name'
                        name='foodName'
                        value={formData.foodName}
                        onChange={handleInputChange}
                        style={{ borderColor: errors.foodName ? 'red' : '' }}
                    />
                    {errors.foodName && <p className='text-red-500 text-sm'>{errors.foodName}</p>}
                </div>
                <div className='flex flex-col gap-0.5'>
                    <label className='text-base font-medium'>Distribute to(Distributor)</label>
                    <Dropdown setDropdownValues={setDropdownValues} dropdownValues={dropdownValues} options={distributors || []} searchBy={"name"} fieldName="distributor" placeholder='Select Distributor' />
                    {errors.distributor && <p className='text-red-500 text-sm'>{errors.producer}</p>}
                </div>
                <div className='flex flex-col gap-0.5'>
                    <label className='text-base font-medium'>Select Crops</label>
                    <Space style={{ width: '100%' }} direction="vertical">
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: '100%', borderColor: errors.cropName ? 'red' : '' }}
                            placeholder="Select Crops"
                            onChange={handleChange} // Step 3: Bind handleChange to the onChange event
                            options={myCrops?.map(crop => ({
                                label: `${crop.cropName} (ID: ${parseInt(crop.cropId?._hex, 16)})`, // Display cropsName and cropsID
                                value: parseInt(crop.cropId?._hex, 16)// Select cropsID as the value
                            }))}

                        />
                        {errors.cropName && <p className='text-red-500 text-sm'>{errors.cropName}</p>}
                    </Space>
                </div>



                <div className='flex flex-col gap-0.5'>
                    <label className='text-base font-medium'>Production Location</label>
                    <Input
                        placeholder='Location'
                        name='location'
                        value={formData.location}
                        onChange={handleInputChange}
                        style={{ borderColor: errors.location ? 'red' : '' }}
                    />
                    {errors.location && <p className='text-red-500 text-sm'>{errors.location}</p>}
                </div>
                <div className='flex flex-col gap-0.5'>
                    <label className='text-base font-medium'>Start Date</label>
                    <DatePicker
                        onChange={onChangeStartDate}
                        className='w-full'
                        style={{ borderColor: errors.startDate ? 'red' : '' }}
                    />
                    {errors.startDate && <p className='text-red-500 text-sm'>{errors.startDate}</p>}
                </div>
                <div className='flex flex-col gap-0.5'>
                    <label className='text-base font-medium'>End Date</label>
                    <DatePicker
                        onChange={onChangeEndDate}
                        className='w-full'
                        style={{ borderColor: errors.endDate ? 'red' : '' }}
                    />
                    {errors.endDate && <p className='text-red-500 text-sm'>{errors.endDate}</p>}
                </div>
                <div className='flex flex-col gap-0.5'>
                    <label className='text-base font-medium'>Price(/Pcs)</label>
                    <Input
                        placeholder='Price'
                        name='price'
                        type='number'
                        value={formData.price}
                        onChange={handleInputChange}
                        style={{ borderColor: errors.price ? 'red' : '' }}
                    />
                    {errors.price && <p className='text-red-500 text-sm'>{errors.price}</p>}
                </div>
                <div className='flex flex-col gap-0.5'>
                    <label className='text-base font-medium'>Quantity</label>
                    <Input
                        placeholder='Quantity'
                        name='quantity'
                        value={formData.quantity}
                        onChange={handleInputChange}
                        type='number'
                        style={{ borderColor: errors.quantity ? 'red' : '' }}
                    />
                    {errors.quantity && <p className='text-red-500 text-sm'>{errors.quantity}</p>}
                </div>
                <div className='flex flex-col gap-0.5'>
                    <label className='text-base font-medium'>Expire Date</label>
                    <DatePicker
                        onChange={onChangeExpireDate}
                        className='w-full'
                        style={{ borderColor: errors.expireDate ? 'red' : '' }}
                    />
                    {errors.expireDate && <p className='text-red-500 text-sm'>{errors.expireDate}</p>}
                </div>
                <button
                    className='bg-[#A1045A] mt-1 text-white px-4 py-1 font-medium text-center rounded'
                    type='submit'
                >
                    {loading ? <span className='flex items-center justify-center gap-1.5'> <Spin indicator={<LoadingOutlined spin />} /> Creating Food</span> : <span>Add Food</span>}
                </button>
            </form>
        </UserLayout>
    );
};

export default AddFoods;
