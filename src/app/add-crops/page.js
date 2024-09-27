'use client';

import React, { useContext, useState } from 'react';
import Breadcrumb from '@/components/utils/Breadcrumb';
import UserLayout from '@/layouts/UserLayout';
import { DatePicker, Input, Spin } from 'antd';
import { Web3Context } from '@/context/Web3Context';
import { LoadingOutlined } from '@ant-design/icons';

const AddCrop = () => {
    const { loading, addCrop } = useContext(Web3Context);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [formData, setFormData] = useState({
        cropName: '',
        location: '',
        price: '',
        quantity: ''
    });

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

    const validateForm = () => {
        const newErrors = {};
        if (!formData.cropName) newErrors.cropName = 'Crop name is required';
        if (!formData.location) newErrors.location = 'Location is required';
        if (!startDate) newErrors.startDate = 'Farming start date is required';
        if (!endDate) newErrors.endDate = 'Farming end date is required';
        if (!formData.price) newErrors.price = 'Price is required';
        if (!formData.quantity) newErrors.quantity = 'Quantity is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return; // Block submission if validation fails

        // Perform any form submission actions here
        addCrop(formData.cropName, formData.location, startDate, endDate, formData.price, formData.quantity);
    };

    return (
        <UserLayout>
            <Breadcrumb title='Add Crop' path='Dashboard / Add Crop' />
            <form
                className='mt-6 flex flex-col mx-auto gap-3 max-w-[750px] px-5 py-5 bg-white rounded'
                onSubmit={handleSubmit}
            >
                <div className='flex flex-col gap-0.5'>
                    <label className='text-base font-medium'>Crop Name</label>
                    <Input
                        placeholder='Crop Name'
                        name='cropName'
                        value={formData.cropName}
                        onChange={handleInputChange}
                        style={{ borderColor: errors.cropName ? 'red' : '' }}
                    />
                    {errors.cropName && <p className='text-red-500 text-sm'>{errors.cropName}</p>}
                </div>
                <div className='flex flex-col gap-0.5'>
                    <label className='text-base font-medium'>Location</label>
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
                    <label className='text-base font-medium'>Farming Start Date</label>
                    <DatePicker
                        onChange={onChangeStartDate}
                        className='w-full'
                        style={{ borderColor: errors.startDate ? 'red' : '' }}
                    />
                    {errors.startDate && <p className='text-red-500 text-sm'>{errors.startDate}</p>}
                </div>
                <div className='flex flex-col gap-0.5'>
                    <label className='text-base font-medium'>Farming End Date</label>
                    <DatePicker
                        onChange={onChangeEndDate}
                        className='w-full'
                        style={{ borderColor: errors.endDate ? 'red' : '' }}
                    />
                    {errors.endDate && <p className='text-red-500 text-sm'>{errors.endDate}</p>}
                </div>
                <div className='flex flex-col gap-0.5'>
                    <label className='text-base font-medium'>Price</label>
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
                        style={{ borderColor: errors.quantity ? 'red' : '' }}
                    />
                    {errors.quantity && <p className='text-red-500 text-sm'>{errors.quantity}</p>}
                </div>
                <button
                    className='bg-[#A1045A] mt-1 text-white px-4 py-1 font-medium text-center rounded'
                    type='submit'
                >
                    {loading ? <span className='flex items-center justify-center gap-1.5'> <Spin indicator={<LoadingOutlined spin />} /> Creating Crop</span> : <span>Add Crop</span>}
                </button>
            </form>
        </UserLayout>
    );
};

export default AddCrop;
