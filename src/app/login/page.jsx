'use client';

import PageTitle from '@/components/layout/PageTitle/PageTitle';
import { showAlertWithTheme } from '@/components/theme/Alert/AlertTheme';
import AxiosPublic from '@/libs/Axios/AxiosPublic';
import { useUser } from '@/provider/UserProvider';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { RiLoginCircleFill } from "react-icons/ri";


const LoginPage = () => {

    const [loading, setLoading] = useState(false);
    const axiosPublic = AxiosPublic();
    const [showError, setShowError] = useState(false);
    const { userId, setUserId } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!userId) {
            document.getElementById('my_modal_login').showModal()
        }
        else {
            router.push('/');
        }
    }, [userId, router]);


    // login fn
    const handleLogin = async (e) => {

        e.preventDefault();
        setLoading(true);
        setShowError(false);

        const lognData = {
            email: e.target.email.value,
            password: e.target.password.value
        };

        const isDarkMode = localStorage.getItem('theme') == 'dark';

        const res = await axiosPublic.post('/api/admin/login', lognData);

        if (res.data.success) {

            localStorage.setItem('userId', res.data.userId);
            setUserId(res.data.userId);

            document.getElementById('my_modal_login').close();

            showAlertWithTheme({
                position: "top-end",
                icon: "success",
                title: "Login Successful!",
                showConfirmButton: false,
                timer: 1500
            }, isDarkMode);

            setTimeout(() => {
                window.location.reload;
            }, 1500);
        }
        else {
            setShowError(true);
        };

        setLoading(false);

    };


     // reset error on input change
     const handleInputChange = () => {
        if (showError) setShowError(false);
    };


    return (
        <>

            <PageTitle title={'Login'} />

            {/* -------- login modal --------- */}
            <dialog id="my_modal_login" className="modal">
                <div className="modal-box bg-primary-bg dark:bg-secondary-bg relative p-10">
                    <h2 className='text-sm md:text-lg font-bold border-b border-b-slate-300 pb-2 mb-3 flex justify-center items-center gap-1'>
                        <RiLoginCircleFill className='mt-[2px]' />
                        <span>Please Login</span>
                    </h2>

                    {/* login form */}
                    <form onSubmit={handleLogin} className={`w-full px-3 md:px-10 py-3 duration-300`}>
                        {/* mobile */}
                        <div>
                            <label htmlFor="email" className='block uppercase font-semibold'>Your E-mail</label>
                            <input type="email" name='email' onChange={handleInputChange} className='w-full bg-transparent border border-slate-300 px-2 py-1 outline-none mt-2 rounded-md' id='mobile' placeholder='Type email' required />
                        </div>
                        {/* password */}
                        <div>
                            <label htmlFor="password" className='block uppercase mt-3 font-semibold'>Your Password</label>
                            <input type="password" name='password'  onChange={handleInputChange} className='w-full bg-transparent border border-slate-300 px-2 py-1 outline-none mt-2 rounded-md' id='mobile' placeholder='Type password' required />
                        </div>

                        {/* show error */}
                        <p className={`${!showError && 'hidden'} text-red-600 py-2 text-xs`}>Invalid Credentials!</p>

                        {/* submit btn */}
                        <button type='submit' className='w-full block py-2 mt-6 bg-primary-color rounded-md text-white font-bold cursor-pointer' >
                            {loading ? <span className="loading loading-spinner loading-md"></span> : 'Login'}
                        </button>
                    </form>


                    {/* modal close btn */}
                    <div className="modal-action absolute -top-3 right-3">
                        <form method="dialog">
                            {/* <button className="text-red-600 text-xl md:text-3xl"><FaCircleXmark /></button> */}
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default LoginPage;
