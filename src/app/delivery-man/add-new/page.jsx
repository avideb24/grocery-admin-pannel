'use client';

import BtnLoading from '@/components/layout/Loadings/BtnLoading/BtnLoading';
import PageTitle from '@/components/layout/PageTitle/PageTitle';
import Wrapper from '@/components/layout/Wrapper/Wrapper';
import Header from '@/components/shared/Header/Header';
import { showAlertWithTheme } from '@/components/theme/Alert/AlertTheme';
import AxiosPublic from '@/libs/Axios/AxiosPublic';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';


const AddNewDeliveryMan = () => {

    const [identityImage, setIdentityImage] = useState(null);
    const [deliveryManImage, setDeliveryManImage] = useState(null);
    const [btnLoading, setBtnLoading] = useState(false);
    const axiosPublic = AxiosPublic();
    const router = useRouter();


    // add new delivery man
    const handleAddNewDeliveryman = async (e) => {
        e.preventDefault();

        setBtnLoading(true);
        const isDarkMode = localStorage.getItem('theme') === 'dark';

        const name = e.target.name.value;
        const email = e.target.email.value;
        const type = e.target.type.value;
        const zone = e.target.zone.value;
        const identityType = e.target.identityType.value;
        const identityNumber = e.target.identityNumber.value;
        const vehicle = e.target.vehicle.value;
        const mobile = e.target.mobile.value;
        const password = e.target.password.value;

        const formData = new FormData();

        formData.append('name', name);
        formData.append('email', email);
        formData.append('type', type);
        formData.append('zone', zone);
        formData.append('identityType', identityType);
        formData.append('identityNumber', identityNumber);
        formData.append('vehicle', vehicle);
        formData.append('mobile', mobile);
        formData.append('password', password);
        formData.append('identityImage', identityImage);
        formData.append('deliveryManImage', deliveryManImage);

        console.log(formData);

        const res = await axiosPublic.post('/api/deliveryMan/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (res.data.success) {
            showAlertWithTheme({
                position: "top-end",
                icon: "success",
                title: "Successfully Added!",
                showConfirmButton: false,
                timer: 1500
            }, isDarkMode);

            e.target.reset();
            setIdentityImage(null);
            setDeliveryManImage(null);
            router.push('/delivery-man/list');
        }
        else {
            showAlertWithTheme({
                position: "top-end",
                icon: "error",
                title: "Something Went Wrong!",
                showConfirmButton: false,
                timer: 1500
            }, isDarkMode);
        }
        setBtnLoading(false)

    };


    return (
        <>
            <PageTitle title={'Add New Devliveryman'} />
            <Header title={'Add New Delivery Man'} />

            <Wrapper>

                {/* add form */}
                <form onSubmit={handleAddNewDeliveryman}>

                    <div className='grid grid-cols-3 gap-3'>

                        {/* left / inputs */}
                        <div className='col-span-2 border-r border-r-slate-300 pr-3'>

                            {/* ---------- general informations ------------ */}
                            <h2 className='py-2 font-bold text-base'>General information</h2>

                            {/* 1st col */}
                            <div className='grid grid-cols-2 gap-5'>

                                {/* name */}
                                <div>
                                    <label htmlFor="name" className='font-semibold'>Name<span className='text-red-600'>*</span></label>
                                    <input type="text" name='name' className='block w-full bg-transparent border border-slate-300 dark:border-slate-500 px-3 py-1 rounded-md outline-none mt-1' placeholder='Type here...' required />
                                </div>

                                {/* E-mail */}
                                <div>
                                    <label htmlFor="email" className='font-semibold'>E-mail<span className='text-red-600'>*</span></label>
                                    <input type="email" name='email' className='block w-full bg-transparent border border-slate-300 dark:border-slate-500 px-3 py-1 rounded-md outline-none mt-1' placeholder='Type here...' required />
                                </div>

                            </div>

                            {/* 2st col */}
                            <div className='grid grid-cols-2 gap-5 py-3'>

                                {/* type */}
                                <div>
                                    <label htmlFor="type" className='font-semibold'>Type<span className='text-red-600'>*</span></label>
                                    <select name="type" className='block w-full bg-primary-bg dark:bg-secondary-bg border border-slate-300 dark:border-slate-500 px-3 py-1 rounded-md outline-none mt-1' id="type" defaultValue={''} required >
                                        <option value="" disabled>Choose One</option>
                                        <option value="Freelancer">Freelancer</option>
                                        <option value="Salary Based">Salary Based</option>
                                    </select>
                                </div>

                                {/* zone */}
                                <div>
                                    <label htmlFor="zone" className='font-semibold'>Zone<span className='text-red-600'>*</span></label>
                                    <select name="zone" className='block w-full bg-primary-bg dark:bg-secondary-bg border border-slate-300 dark:border-slate-500 px-3 py-1 rounded-md outline-none mt-1' id="zone" defaultValue={''} required >
                                        <option value="" disabled>Choose One</option>
                                        <option value="Mirpur">Mirpur</option>
                                        <option value="Uttara">Uttara</option>
                                        <option value="Bashundhara">Bashundhara</option>
                                    </select>
                                </div>

                            </div>

                            {/* 3rd col */}
                            <div className='grid grid-cols-2 gap-5'>

                                {/* idendity type  */}
                                <div>
                                    <label htmlFor="identityType" className='font-semibold'>Identity Type<span className='text-red-600'>*</span></label>
                                    <select name="identityType" className='block w-full bg-primary-bg dark:bg-secondary-bg border border-slate-300 dark:border-slate-500 px-3 py-1 rounded-md outline-none mt-1' id="identityType" defaultValue={''} required >
                                        <option value="" disabled>Choose One</option>
                                        <option value="NID">NID</option>
                                        <option value="Passport">Passport</option>
                                        <option value="Driving License">Driving License</option>
                                    </select>
                                </div>

                                {/* identity number */}
                                <div>
                                    <label htmlFor="identityNumber" className='font-semibold'>Identity Number<span className='text-red-600'>*</span></label>
                                    <input type="number" name='identityNumber' className='block w-full bg-transparent border border-slate-300 dark:border-slate-500 px-3 py-1 rounded-md outline-none mt-1' placeholder='Type here...' required />
                                </div>


                            </div>

                            {/* 4st col */}
                            <div className='grid grid-cols-2 gap-5 py-3'>

                                {/* vehicle  */}
                                <div>
                                    <label htmlFor="vehicle" className='font-semibold'>Vehicle<span className='text-red-600'>*</span></label>
                                    <select name="vehicle" className='block w-full bg-primary-bg dark:bg-secondary-bg border border-slate-300 dark:border-slate-500 px-3 py-1 rounded-md outline-none mt-1' id="vehicle" defaultValue={''} required >
                                        <option value="" disabled>Choose One</option>
                                        <option value="Bike">Bike</option>
                                        <option value="Bycycle">Bycycle</option>
                                    </select>
                                </div>

                            </div>

                            {/* ---------- login info ----------- */}
                            <h2 className='pt-5 pb-2 font-bold text-base'>Login Information</h2>

                            {/* 5st col */}
                            <div className='grid grid-cols-2 gap-5'>

                                {/* mobile */}
                                <div>
                                    <label htmlFor="mobile" className='font-semibold'>Mobile<span className='text-red-600'>*</span></label>
                                    <input type="number" name='mobile' className='block w-full bg-transparent border border-slate-300 dark:border-slate-500 px-3 py-1 rounded-md outline-none mt-1' placeholder='Type here...' required />
                                </div>

                                {/* E-mail */}
                                <div>
                                    <label htmlFor="password" className='font-semibold'>Password<span className='text-red-600'>*</span></label>
                                    <input type="password" name='password' className='block w-full bg-transparent border border-slate-300 dark:border-slate-500 px-3 py-1 rounded-md outline-none mt-1' placeholder='Type here...' required />
                                </div>

                            </div>

                        </div>

                        {/* right / images */}
                        <div>

                            {/* --------- images --------- */}
                            <h2 className='py-2 font-bold text-base'>Images</h2>

                            {/* delivery man image */}
                            <div className='pb-3'>
                                <label className='font-semibold'>Delivery Man Image<span className='text-red-600'>*</span></label>
                                <input type="file" onChange={(e) => setDeliveryManImage(e.target.files[0])} className='block w-full bg-transparent border border-slate-300 dark:border-slate-500 px-3 py-1 rounded-md outline-none mt-1 cursor-pointer' required />
                                {deliveryManImage && <Image src={URL.createObjectURL(deliveryManImage)} alt="Delivery Man Image" width={100} height={100} className='mt-2' />}
                            </div>

                            {/* identity Image */}
                            <div>
                                <label className='font-semibold'>Identity Image<span className='text-red-600'>*</span></label>
                                <input type="file" onChange={(e) => setIdentityImage(e.target.files[0])} className='block w-full bg-transparent border border-slate-300 dark:border-slate-500 px-3 py-1 rounded-md outline-none mt-1 cursor-pointer' required />
                                {identityImage && <Image src={URL.createObjectURL(identityImage)} alt="Identity Image" width={100} height={100} className='mt-2' />}
                            </div>

                        </div>

                    </div>

                    {/* submit btn */}
                    <button type='submit' className='w-full bg-primary-color text-secondary-text py-2 rounded-md my-6'>
                        {btnLoading ? <BtnLoading /> : 'Save'}
                    </button>

                </form>

            </Wrapper>

        </>
    );
};

export default AddNewDeliveryMan;