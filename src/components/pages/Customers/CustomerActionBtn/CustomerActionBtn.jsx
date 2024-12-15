'use client';

import { showAlertWithTheme } from '@/components/theme/Alert/AlertTheme';
import React, { useState } from 'react';
import { FaTrashAlt } from "react-icons/fa";


const CustomerActionBtn = ({ customer }) => {

    // customer delete fn
    const handleDeleteCustomer = async (customerId) => {

        const isDarkMode = localStorage.getItem('theme') == 'dark';

        showAlertWithTheme({
            title: "Are you sure?",
            text: `Delete ${customer?.name ? customer?.name : customer?.mobile}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete"
        }, isDarkMode).then((result) => {
            if (result.isConfirmed) {

                console.log(customerId);
                // call api here

                showAlertWithTheme({
                    title: "Deleted!",
                    icon: "success"
                }, isDarkMode);
                // refresh the window
                setTimeout(() => {
                    window.location.reload();
                }, 1400);
            }
        }, isDarkMode);


    };

    return (
        <>
            <button onClick={() => handleDeleteCustomer(customer?.id)} className='text-base md:text-xl text-red-600'>
                <FaTrashAlt />
            </button>
        </>
    );
};

export default CustomerActionBtn;