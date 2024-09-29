"use client";
import { Web3Context } from '@/context/Web3Context';
import UserLayout from '@/layouts/UserLayout';
import React, { useContext, useEffect } from 'react';
import { FaUserShield, FaSeedling, FaUtensils, FaTruck } from 'react-icons/fa'; // Icons

const Dashboard = () => {
    const { allUsers, crops, foodItems, distributions, currentAccount, userRole, fetchAllFoodItems, fetchAllCrops } = useContext(Web3Context);

    const stats = [
        { name: "Registered Users", count: allUsers?.length, icon: <FaUserShield />, gradient: "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-600", iconBg: "bg-red-600" },
        { name: "Crops", count: crops?.length, icon: <FaSeedling />, gradient: "bg-gradient-to-r from-green-400 via-teal-500 to-cyan-600", iconBg: "bg-teal-600" },
        { name: "Food Items", count: foodItems?.length, icon: <FaUtensils />, gradient: "bg-gradient-to-r from-purple-500 via-pink-600 to-red-600", iconBg: "bg-pink-700" },
        { name: "Distributions", count: distributions?.length, icon: <FaTruck />, gradient: "bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700", iconBg: "bg-indigo-700" },
    ];

    useEffect(() => {
        fetchAllFoodItems();
        fetchAllCrops();
    }, []);

    return (
        <UserLayout>
            <div className="container mx-auto p-6">
                {/* Welcome Message */}
                <div className="mb-6 p-6 rounded-2xl shadow-lg bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-center transition-transform transform hover:scale-105 hover:shadow-2xl">
                    <h1 className="text-3xl font-extrabold text-white tracking-wide animate-pulse">
                        👋 Welcome Back, <span className="capitalize underline decoration-wavy decoration-pink-400">{userRole}</span>!
                    </h1>
                    <p className="mt-2 text-base font-medium text-white opacity-90">We’re glad to see you again. Let’s make today productive!</p>
                </div>

                {/* Cards Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Dynamically generated stats cards */}
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className={`${stat.gradient} relative h-[100px] p-4 rounded-2xl shadow-lg transition-transform transform hover:-translate-y-1 hover:shadow-2xl`}
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-base font-semibold text-white">{stat.name}</h2>
                                    <p className="text-xl font-bold text-white">{stat.count}</p>
                                </div>
                                <div className={`p-3 rounded-full text-white text-3xl ${stat.iconBg}`}>
                                    {stat.icon}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Current Account Card */}
                    <div className="col-span-2 relative h-[100px] p-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-2xl shadow-lg transition-transform transform hover:-translate-y-1 hover:shadow-2xl">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-base font-semibold text-white">Current Account</h2>
                                <p className="text-xl font-bold text-white">{currentAccount}</p>
                                <p className="text-sm text-white opacity-80">Role: {userRole}</p>
                            </div>
                            <div className={`p-3 rounded-full text-white text-3xl ${userRole === 'Admin' ? 'bg-blue-700' : 'bg-gray-500'}`}>
                                <FaUserShield />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
};

export default Dashboard;
