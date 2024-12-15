'use client';


import AxiosPublic from '@/libs/Axios/AxiosPublic';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react';


const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);


const UserProvider = ({ children }) => {

    const [userId, setUserId] = useState(null);
    const [user, setUser] = useState(null);
    const [userLoading, setUserLoading] = useState(true);
    const axiosPublic = AxiosPublic();
    const router = useRouter();


    // initial user load
    useEffect(() => {
        const isExistingId = localStorage.getItem('userId');

        if (isExistingId && isExistingId !== 'null') {
            setUserId(isExistingId);
            // const fetchUser = async () => {
            //   const res = await axiosPublic.get(`/api/user/user/${isExistingId}`);
            //   setUser(res.data.data);
            // };

            // fetchUser();
            setUserLoading(false);

        } else {
            setUserLoading(false);
            router.push('/login');
        }
    }, [axiosPublic, router]);


    const values = { userId, setUserId, user, setUser, userLoading, setUserLoading };


    return (
        <UserContext.Provider value={values}>
            {
                userLoading ?  
                <div className='w-full h-screen flex justify-center items-center'>
                    <span className="loading loading-bars loading-lg bg-primary-color"></span>
                </div>
                : children
            }
        </UserContext.Provider>
    );
};

export default UserProvider;
