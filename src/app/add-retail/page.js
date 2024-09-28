'use client'
import React, { useContext, useEffect, useState } from 'react';
import Breadcrumb from '@/components/utils/Breadcrumb';
import UserLayout from '@/layouts/UserLayout';
import { DatePicker, Input, Spin } from 'antd';
import { Web3Context } from '@/context/Web3Context';
import { LoadingOutlined } from '@ant-design/icons';
import Dropdown from '@/components/utils/CustomDropdown';
import CustomModal from '@/components/utils/Modal';
import FoodQrModal from './components/FoodQrModal';

const AddRetail = () => {
    const [generatedQRCode, setGeneratedQRCode] = useState(null);

    const { loading, foodItems, fetchAllFoodItems, distributions, fetchAllDistributions, addRetailEntry, isRetailerAdded, setIsRetailerAdded } = useContext(Web3Context);
    const [startDate, setStartDate] = useState('');
    const [sellDate, setSellDate] = useState('');
    const [expireDate, setExpireDate] = useState('');
    const [dropdownValues, setDropdownValues] = useState({});
    const distributionIds = distributions?.map(distribution => ({ id: parseInt(distribution?.distributorId, 16) }));
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
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
        setSellDate(dateString);
        if (dateString) {
            setErrors(prev => ({ ...prev, sellDate: '' })); // Clear error if valid
        }
    };

    const onChangeExpireDate = (date, dateString) => {
        setExpireDate(dateString);
        if (dateString) {
            setErrors(prev => ({ ...prev, expireDate: '' })); // Clear error if valid
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
        if (!dropdownValues?.food) newErrors.food = 'Food is required';
        if (!dropdownValues?.distribution) newErrors.distribution = 'Distribution is required';
        if (!formData.location) newErrors.location = 'Location is required';
        if (!startDate) newErrors.startDate = 'Received date is required';
        if (!sellDate) newErrors.sellDate = 'Sell date is required';
        if (!expireDate) newErrors.expireDate = 'Expire date is required';
        if (!formData.price) newErrors.price = 'Price is required';
        if (!formData.quantity) newErrors.quantity = 'Quantity is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // useEffect to handle QR code generation and modal state
    useEffect(() => {
        if (isRetailerAdded) {
            setOpen(true);

            // Generate dynamic URL
            const dynamicUrl = `http://localhost:3000/trace-food/${parseInt(dropdownValues?.food?.foodId?._hex, 16)}`;
            setGeneratedQRCode(dynamicUrl);
        }
    }, [isRetailerAdded, dropdownValues?.food?.foodId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return; // Block submission if validation fails

        // Perform any form submission actions here
        addRetailEntry(
            parseInt(dropdownValues?.food?.foodId?._hex, 16),
            dropdownValues?.distribution?.id,
            formData?.location,
            startDate,
            sellDate,
            formData?.price,
            formData?.quantity,
            expireDate
        );
    };

    useEffect(() => {
        fetchAllFoodItems();
        fetchAllDistributions();
    }, []);

    return (
        <UserLayout>
            <Breadcrumb title='Add Retail Information' path='Dashboard / Add Retail' />
            <form
                className='mt-6 flex flex-col mx-auto gap-3 max-w-[750px] px-5 py-5 bg-white rounded'
                onSubmit={handleSubmit}
            >
                <div className='flex flex-col gap-0.5'>
                    <label className='text-base font-medium'>Select Food</label>
                    <Dropdown setDropdownValues={setDropdownValues} dropdownValues={dropdownValues} options={foodItems} searchBy={"foodName"} fieldName="food" placeholder='Select Food' />

                    {errors.food && <p className='text-red-500 text-sm'>{errors.food}</p>}
                </div>

                <div className='flex flex-col gap-0.5'>
                    <label className='text-base font-medium'>Select Distribution ID</label>
                    <Dropdown setDropdownValues={setDropdownValues} dropdownValues={dropdownValues} options={distributionIds} searchBy={"id"} fieldName="distribution" placeholder='Select Distribution ID' />

                    {errors.distribution && <p className='text-red-500 text-sm'>{errors.distribution}</p>}
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
                    <label className='text-base font-medium'>Received Date</label>
                    <DatePicker
                        onChange={onChangeStartDate}
                        className='w-full'
                        style={{ borderColor: errors.startDate ? 'red' : '' }}
                    />
                    {errors.startDate && <p className='text-red-500 text-sm'>{errors.startDate}</p>}
                </div>
                <div className='flex flex-col gap-0.5'>
                    <label className='text-base font-medium'>Sell Date</label>
                    <DatePicker
                        onChange={onChangeEndDate}
                        className='w-full'
                        style={{ borderColor: errors.sellDate ? 'red' : '' }}
                    />
                    {errors.sellDate && <p className='text-red-500 text-sm'>{errors.sellDate}</p>}
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
                        type='number'
                        value={formData.quantity}
                        onChange={handleInputChange}
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
                    {loading ? <span className='flex items-center justify-center gap-1.5'> <Spin indicator={<LoadingOutlined spin />} /> Creating Retail Information</span> : <span>Add Retail Information</span>}
                </button>
            </form>
            <CustomModal  closable={false} modalClass={'!max-w-[700px] !w-full'} modalTitle={''} setOpen={setOpen} open={open} modalContent={<FoodQrModal generatedQRCode={generatedQRCode} setOpen={setOpen} setIsRetailerAdded={setIsRetailerAdded}/>} />
        </UserLayout>
    );
};

export default AddRetail;
