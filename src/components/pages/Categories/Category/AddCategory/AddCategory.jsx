'use client';

import Button from '@/components/shared/Buttons/Button/Button';
import { showAlertWithTheme } from '@/components/theme/Alert/AlertTheme';
import AxiosPublic from '@/libs/Axios/AxiosPublic';
import { getMainCategories } from '@/libs/Categories/getMainCategories';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaPlusCircle } from "react-icons/fa";


const AddCategory = () => {

    const [productTitle, setProductTitle] = useState('');
    const [titleError, setTitleError] = useState(false);
    const [mainCategories, setmainCategories] = useState(null);
    const [iconPreview, setIconPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const axiosPublic = AxiosPublic();


    // load main categories
    useEffect(() => {
        const fetMainCategories = async () => {
            const res = await getMainCategories();
            if (res.success) {
                setmainCategories(res.data)
            }

        };
        fetMainCategories();
    }, []);

    // show uploaded image
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setIconPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setIconPreview(null);
        }
    };

    // check title if any special character contains
    const handleCheckTitle = e => {
        const title = e.target.value;
        const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/g;
        if (specialCharPattern.test(title)) {
            setTitleError(true);
        } else {
            setTitleError(false);
        }
        setProductTitle(title);
    };



    // add new category fn
    const handleAddCategory = async (e) => {
        e.preventDefault();
        setLoading(true);

        const isDarkMode = localStorage.getItem('theme') == 'dark';

        const formData = new FormData();
        const title = e.target.title.value;
        const mainCategoryId = e.target.mainCatgory.value;
        const iconFile = e.target.icon.files[0];

        formData.append('title', title);
        formData.append('mainCategoryId', mainCategoryId);
        formData.append('category', iconFile);

        const res = await axiosPublic.post('/api/category/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (res.data.success) {
            setLoading(false);
            e.target.reset();
            setIconPreview(null);

            showAlertWithTheme({
                position: "top-end",
                icon: "success",
                title: "Saved!",
                showConfirmButton: false,
                timer: 1500
            }, isDarkMode);

        }
        else {
            // console.error('Error from server:', res.data.error);
            setLoading(false);
            showAlertWithTheme({
                position: "top-end",
                icon: "error",
                title: "Something went wrong!",
                showConfirmButton: false,
                timer: 1500
            }, isDarkMode);
        }

        // close modal
        document.getElementById('my_modal_2').close();

        // refresh the window
        setTimeout(() => {
            window.location.reload();
        }, 1600);
    };




    return (
        <>

            {/* modal btn */}
            <Button btnText={'Add New'} icon={FaPlusCircle} handleClick={() => document.getElementById('my_modal_2').showModal()} />

            {/* modal */}
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box bg-primary-bg dark:bg-secondary-bg text-primary-text dark:text-secondary-text">

                    {/* close btn */}
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

                    <h2 className='text-center text-base md:text-lg font-bold border-b border-b-slate-300 dark:border-b-slate-500 pb-1 mb-4'>Add New Category</h2>

                    <form onSubmit={handleAddCategory} className='space-y-3'>
                        <div className='grid grid-cols-2 gap-3'>
                            {/* title */}
                            <div>
                                <label htmlFor="title" className='font-semibold'>Category Name<span className='text-red-600'>*</span>
                                </label>
                                <input type="text" onChange={(e) => handleCheckTitle(e)} name='title' className='bg-transparent w-full px-3 py-1 rounded-md mt-1 outline-none border border-slate-300 dark:border-slate-500' placeholder='Category Name...' id='title' required />
                            </div>
                            {/* main category */}
                            <div>
                                <label htmlFor="mainCatgory" className='font-semibold'>Select Main Category<span className='text-red-600'>*</span></label>
                                <select name="mainCatgory" className='bg-primary-bg dark:bg-secondary-bg w-full px-3 py-1 rounded-md mt-1 outline-none border border-slate-300 dark:border-slate-500' id="mainCatgory" defaultValue={''} required >
                                    <option value="" disabled>Choose one</option>
                                    {
                                        mainCategories?.map(category =>
                                            <option key={category?.id} value={category?.id}>{category?.title}</option>
                                        )
                                    }
                                </select>
                            </div>
                        </div>

                        {/* title error text */}
                        {
                            titleError && <span className='font-normal text-[10px] md:text-xs text-red-600 '>(please remove special characters)</span>
                        }

                        {/* File */}
                        <div>
                            <label htmlFor="icon" className='font-semibold'>Category Icon<span className='text-red-600'>*</span></label>
                            <input type="file" name='icon' className='bg-transparent w-full px-3 py-1 rounded-md mt-1 outline-none border border-slate-300 dark:border-slate-500 mb-3 cursor-pointer' id='icon' onChange={handleFileChange} required />
                            {iconPreview && (
                                <div className='mt-2'>
                                    <Image src={iconPreview} className='w-20 h-20 object-contain rounded-md' width={100} height={100} alt="Icon Preview" />
                                </div>
                            )}
                        </div>
                        {/* btn */}
                        <button type='submit' className={`${titleError ? 'cursor-not-allowed' : 'cursor-pointer'} bg-primary-color text-secondary-text w-full px-3 py-1 rounded-md mt-1 outline-none`} disabled={titleError}>
                            {
                                loading ? <span className="loading loading-spinner loading-md"></span> :
                                    <span>Save</span>
                            }
                        </button>
                    </form>

                </div>
            </dialog>

        </>
    );
};

export default AddCategory;