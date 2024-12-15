'use client';

import { showAlertWithTheme } from '@/components/theme/Alert/AlertTheme';
import { useUser } from '@/provider/UserProvider';
import { useRouter } from 'next/navigation';
import React from 'react';
import { ImSwitch } from "react-icons/im";

const Logout = () => {

    const { setUserId } = useUser();
    const router = useRouter();

    // logout fn
    const handleLogout = () => {

        router.push('/login');

        localStorage.setItem('userId', null);

        const isDarkMode = localStorage.getItem('theme') == 'dark';

        showAlertWithTheme({
            position: "top-end",
            icon: "success",
            title: "Logout SuccessFully!",
            showConfirmButton: false,
            timer: 1500
        }, isDarkMode);
        setUserId(null);
    };

    return (
        <button onClick={handleLogout} className="flex items-center gap-1 bg-primary-color px-3 py-1 rounded-md font-semibold text-secondary-text text-xs" >
            <ImSwitch className='mt-[2px]' />
            <span>Logout</span>
        </button>
    );
};

export default Logout;