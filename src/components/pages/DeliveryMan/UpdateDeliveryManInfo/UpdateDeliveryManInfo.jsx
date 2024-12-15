'use client';

import BtnLoading from '@/components/layout/Loadings/BtnLoading/BtnLoading';
import { showAlertWithTheme } from '@/components/theme/Alert/AlertTheme';
import AxiosPublic from '@/libs/Axios/AxiosPublic';
import Image from 'next/image';
import React, { useState } from 'react';


const UpdateDeliveryManInfo = ({ deliveryManData }) => {

    const [deliveryManImage, setDeliveryManImage] = useState(deliveryManData?.deliveryManImage ? deliveryManData?.deliveryManImage : null);
    const [identityImage, setIdentityImage] = useState(deliveryManData?.identityImage ? deliveryManData?.identityImage : null);
    const [btnLoading, setBtnLoading] = useState(false);
    const axiosPublic = AxiosPublic();


    // info update fn
    const handleUpdateInfo = async (e) => {
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

        const res = await axiosPublic.patch(`/api/deliveryMan/update/${deliveryManData?.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (res.data.success) {
            showAlertWithTheme({
                position: "top-end",
                icon: "success",
                title: "Information Updated!",
                showConfirmButton: false,
                timer: 1500
            }, isDarkMode);

            // reload page
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        }
        else {
            showAlertWithTheme({
                position: "top-end",
                icon: "error",
                title: "Something Went Wrong!",
                showConfirmButton: false,
                timer: 1500
            }, isDarkMode)
        }

        document.getElementById(`my_modal_deliveryManUpdate_${deliveryManData?.id}`).close();
        setBtnLoading(false)

    };


    return (
        <dialog id={`my_modal_deliveryManUpdate_${deliveryManData?.id}`} className="modal">
            <div className="modal-box bg-primary-bg dark:bg-secondary-bg text-left rounded-none custom-scollbar capitalize">

                <form method="dialog">
                    {/* close btn */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>

                <h2 className='text-base text-center font-bold border-b border-b-slate-300 p-2 mb-3'>Update Delivery Man Information</h2>

                {/* add form */}
                <form onSubmit={handleUpdateInfo}>

                    {/* left / inputs */}
                    <div>

                        {/* ---------- general informations ------------ */}
                        <h2 className='py-2 font-bold'>General information</h2>

                        {/* 1st col */}
                        <div className='grid grid-cols-2 gap-5'>

                            {/* name */}
                            <div>
                                <label htmlFor="name">Name<span className='text-red-600'>*</span></label>
                                <input type="text" name='name' defaultValue={deliveryManData?.name} className='block w-full bg-transparent border border-slate-300 dark:border-slate-500 px-3 py-1 rounded-md outline-none mt-1' placeholder='Type here...' required />
                            </div>

                            {/* E-mail */}
                            <div>
                                <label htmlFor="email">E-mail<span className='text-red-600'>*</span></label>
                                <input type="email" name='email' defaultValue={deliveryManData?.email} className='block w-full bg-transparent border border-slate-300 dark:border-slate-500 px-3 py-1 rounded-md outline-none mt-1' placeholder='Type here...' required />
                            </div>

                        </div>

                        {/* 2st col */}
                        <div className='grid grid-cols-2 gap-5 py-3'>

                            {/* type */}
                            <div>
                                <label htmlFor="type">Type<span className='text-red-600'>*</span></label>
                                <select name="type" className='block w-full bg-primary-bg dark:bg-secondary-bg border border-slate-300 dark:border-slate-500 px-3 py-1 rounded-md outline-none mt-1' id="type" defaultValue={deliveryManData?.type} required >
                                    <option value="" disabled>Choose One</option>
                                    <option value="Freelancer">Freelancer</option>
                                    <option value="Salary Based">Salary Based</option>
                                </select>
                            </div>

                            {/* zone */}
                            <div>
                                <label htmlFor="zone">Zone<span className='text-red-600'>*</span></label>
                                <select name="zone" className='block w-full bg-primary-bg dark:bg-secondary-bg border border-slate-300 dark:border-slate-500 px-3 py-1 rounded-md outline-none mt-1' id="zone" defaultValue={deliveryManData?.zone} required >
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
                                <label htmlFor="identityType">Identity Type<span className='text-red-600'>*</span></label>
                                <select name="identityType" className='block w-full bg-primary-bg dark:bg-secondary-bg border border-slate-300 dark:border-slate-500 px-3 py-1 rounded-md outline-none mt-1' id="identityType" defaultValue={deliveryManData?.identityType} required >
                                    <option value="" disabled>Choose One</option>
                                    <option value="NID">NID</option>
                                    <option value="Passport">Passport</option>
                                    <option value="Driving License">Driving License</option>
                                </select>
                            </div>

                            {/* identity number */}
                            <div>
                                <label htmlFor="identityNumber">Identity Number<span className='text-red-600'>*</span></label>
                                <input type="number" name='identityNumber' defaultValue={deliveryManData?.identityNumber} className='block w-full bg-transparent border border-slate-300 dark:border-slate-500 px-3 py-1 rounded-md outline-none mt-1' placeholder='Type here...' required />
                            </div>


                        </div>

                        {/* 4st col */}
                        <div className='grid grid-cols-2 gap-5 py-3'>

                            {/* vehicle  */}
                            <div>
                                <label htmlFor="vehicle">Vehicle<span className='text-red-600'>*</span></label>
                                <select name="vehicle" className='block w-full bg-primary-bg dark:bg-secondary-bg border border-slate-300 dark:border-slate-500 px-3 py-1 rounded-md outline-none mt-1' id="vehicle" defaultValue={deliveryManData?.vehicle} required >
                                    <option value="" disabled>Choose One</option>
                                    <option value="Bike">Bike</option>
                                    <option value="Bycycle">Bycycle</option>
                                </select>
                            </div>

                        </div>

                        {/* ---------- login info ----------- */}
                        <h2 className='py-2 font-bold'>Login Information</h2>

                        {/* 5st col */}
                        <div className='grid grid-cols-2 gap-5'>

                            {/* mobile */}
                            <div>
                                <label htmlFor="mobile">Mobile<span className='text-red-600'>*</span></label>
                                <input type="number" name='mobile' defaultValue={deliveryManData?.mobile} className='block w-full bg-transparent border border-slate-300 dark:border-slate-500 px-3 py-1 rounded-md outline-none mt-1' placeholder='Type here...' required />
                            </div>

                            {/* E-mail */}
                            <div>
                                <label htmlFor="password">Password<span className='text-red-600'>*</span></label>
                                <input type="password" name='password' defaultValue={deliveryManData?.password} className='block w-full bg-transparent border border-slate-300 dark:border-slate-500 px-3 py-1 rounded-md outline-none mt-1' placeholder='Type here...' required />
                            </div>

                        </div>

                    </div>

                    {/* right / images */}
                    <div>

                        {/* --------- images --------- */}
                        <h2 className='py-2 font-bold'>Images</h2>

                        {/* delivery man image */}
                        <div className='pb-3'>
                            <p>Delivery Man Image<span className='text-red-600'>*</span></p>
                            <input type="file" onChange={(e) => setDeliveryManImage(e.target.files[0])} className='block w-full bg-transparent border border-slate-300 dark:border-slate-500 px-3 py-1 rounded-md outline-none mt-1 cursor-pointer' />
                            {
                                deliveryManImage && (
                                    <div className="mt-2">
                                        <Image
                                            src={typeof deliveryManImage === 'string' ? deliveryManImage : URL.createObjectURL(deliveryManImage)}
                                            width={100}
                                            height={100}
                                            alt="Thumbnail Preview"
                                            className="w-24 h-24 object-contain rounded-md"
                                        />
                                    </div>
                                )
                            }
                        </div>

                        {/* identity Image */}
                        <div>
                            <p>Identity Image<span className='text-red-600'>*</span></p>
                            <input type="file" onChange={(e) => setIdentityImage(e.target.files[0])} className='block w-full bg-transparent border border-slate-300 dark:border-slate-500 px-3 py-1 rounded-md outline-none mt-1 cursor-pointer' />
                            {
                                identityImage && (
                                    <div className="mt-2">
                                        <Image
                                            src={typeof identityImage === 'string' ? identityImage : URL.createObjectURL(identityImage)}
                                            width={100}
                                            height={100}
                                            alt="Thumbnail Preview"
                                            className="w-24 h-24 object-contain rounded-md"
                                        />
                                    </div>
                                )
                            }
                        </div>

                    </div>

                    {/* submit btn */}
                    <button type='submit' className='w-full bg-primary-color text-secondary-text py-2 rounded-md my-6'>
                        {btnLoading ? <BtnLoading /> : 'Save'}
                    </button>

                </form>

            </div>
        </dialog>
    );
};

export default UpdateDeliveryManInfo;