'use client';

import { showAlertWithTheme } from '@/components/theme/Alert/AlertTheme';
import AxiosPublic from '@/libs/Axios/AxiosPublic';
import { getDeliveryManDropDown } from '@/libs/DeliveryMan/getDeliveryManDropDown';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { TbTruckDelivery } from "react-icons/tb";


const DeliveryMan = ({orderDetails}) => {

    const [allDeliveryMan, setAllDeliveryMan] = useState([]);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const axiosPublic = AxiosPublic();

    // Load deliveryman list
    useEffect(() => {
        const fetchDeliveryManData = async () => {
            const res = await getDeliveryManDropDown();
            setAllDeliveryMan(res);
        };
        fetchDeliveryManData();
    }, []);

    // Toggle dropdown function
    const toggleDropdown = (orderId) => {
        setActiveDropdown((prev) => (prev === orderId ? null : orderId));
    };


    // Assign deliveryman function
    const handleAssignDeliveryman = async (deliveryMan, orderId) => {

        setActiveDropdown(null);
        const isDarkMode = localStorage.getItem('theme') === 'dark';

        const query = {
            deliveryManId: deliveryMan?.id
        };    

        try {
            const res = await axiosPublic.patch(`/api/order/update/${orderId}`, query);

            if (res.data.success) {
                showAlertWithTheme({
                    position: "top-end",
                    icon: "success",
                    title: "Updated!",
                    showConfirmButton: false,
                    timer: 1500
                }, isDarkMode);

                // relaod page
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            } else {
                showAlertWithTheme({
                    position: "top-end",
                    icon: "error",
                    title: "Something Went Wrong!",
                    showConfirmButton: false,
                    timer: 1500
                }, isDarkMode);
            }
        } catch (error) {
            showAlertWithTheme({
                position: "top-end",
                icon: "error",
                title: "Failed to Assign!",
                showConfirmButton: false,
                timer: 1500
            }, isDarkMode);
        }
    };


    return (
        <div className='p-3 border border-slate-200 dark:border-slate-600 shadow-lg rounded-md my-5'>

            <h2 className='text-sm md:text-base font-bold pb-2 flex items-center gap-1'>
                <TbTruckDelivery />
                Delivery Man
            </h2>

            <p>
                {
                    orderDetails?.deliveryMan ? (
                        <div className='flex flex-col items-center  gap-1'>
                            <Image
                                src={orderDetails?.deliveryMan?.deliveryManImage}
                                className='w-20 h-20 object-cover'
                                width={40}
                                height={40}
                                alt={orderDetails?.deliveryMan?.name}
                            />
                            <p>{orderDetails?.deliveryMan?.name}</p>
                        </div>
                    ) : (
                        <span className='text-red-600'>Not Set</span>
                    )
                }
            </p>

            <div className="relative mt-2">
                <button
                    className={`${orderDetails?.deliveryMan ? 'bg-blue-600 text-white' : 'bg-gray-400 text-white'} px-3 py-1 rounded-md outline-none cursor-pointer capitalize`}
                    onClick={() => toggleDropdown(orderDetails.id)}
                >
                    {orderDetails?.deliveryMan ? 'Change' : 'Choose One'}
                </button>

                {activeDropdown === orderDetails?.id && (
                    <ul className="absolute top-8 left-0 min-w-max p-2 bg-white dark:bg-gray-800 border border-gray-200 shadow-lg mt-2 z-20 rounded-md">
                        {allDeliveryMan?.length === 0 ? (
                            <div className='font-bold py-3 text-red-600'>No Delivery Man Found!</div>
                        ) : (
                            allDeliveryMan?.map((deliveryMan) => (
                                <li
                                    key={deliveryMan.id}
                                    className="flex items-center px-2 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={() => handleAssignDeliveryman(deliveryMan, orderDetails?.id)}
                                >
                                    <Image
                                        src={deliveryMan?.deliveryManImage}
                                        className="w-10 h-10 object-cover mr-2"
                                        width={50}
                                        height={50}
                                        alt={deliveryMan?.name}
                                    />
                                    <span>{deliveryMan?.name}</span>
                                </li>
                            ))
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default DeliveryMan;
