'use client';

import Button from '@/components/shared/Buttons/Button/Button';
import { showAlertWithTheme } from '@/components/theme/Alert/AlertTheme';
import AxiosPublic from '@/libs/Axios/AxiosPublic';
import { getMainCategories } from '@/libs/Categories/getMainCategories';
import { getCategories } from '@/libs/Categories/getSubCategory';
import React, { useEffect, useState } from 'react';
import { FaPlusCircle } from "react-icons/fa";


const AddSubCategory = () => {

    const [mainCategories, setMainCategories] = useState([]);
    const [selectedMainCategoryId, setSelectedMainCategoryId] = useState(null);
    const [categories, setCategories] = useState(null);
    const [loading, setLoading] = useState(false);
    const [productTitle, setProductTitle] = useState('');
    const [titleError, setTitleError] = useState(false);
    const axiosPublic = AxiosPublic();


    // load main categories
    useEffect(() => {
        const fetchMainCategories = async () => {
            const res = await getMainCategories();
            if (res.success) {
                setMainCategories(res.data);
            }
        };
        fetchMainCategories();
    }, [])

    // load categories
    useEffect(() => {
        const fetchCategories = async () => {
            const res = await getCategories(selectedMainCategoryId);
            if (res.success) {
                setCategories(res.data)
            }
        };
        fetchCategories();
    }, [selectedMainCategoryId]);


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
    const handleAddSubCategory = async (e) => {
        e.preventDefault();
        setLoading(true);

        const isDarkMode = localStorage.getItem('theme') == 'dark';

        const newSubCategory = {
            title: e.target.title.value,
            categoryId: e.target.category.value,
        };

        const res = await axiosPublic.post('/api/subCategory/create', newSubCategory);

        if (res.data.success) {
            setLoading(false);
            setSelectedMainCategoryId(null);
            e.target.reset();

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
        document.getElementById('my_modal_3').close();
        // refresh the window
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    };



    return (
        <>

            {/* modal btn */}
            <Button btnText={'Add New'} icon={FaPlusCircle} handleClick={() => document.getElementById('my_modal_3').showModal()} />

            {/* modal */}
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box bg-primary-bg dark:bg-secondary-bg text-primary-text dark:text-secondary-text">

                    {/* close btn */}
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

                    <h2 className='text-center text-base md:text-lg font-bold border-b border-b-slate-300 dark:border-b-slate-500 pb-1 mb-4'>Add New Sub Category</h2>

                    <form onSubmit={handleAddSubCategory} className='space-y-3'>
                        {/* title */}
                        <div>
                            <label htmlFor="title" className='font-semibold'>Sub-Category Name<span className='text-red-600'>*</span>
                                {
                                    titleError && <span className='font-normal text-[10px] md:text-xs text-red-600 pl-5'>(please remove special characters)</span>
                                }
                            </label>
                            <input type="text" onChange={(e) => handleCheckTitle(e)} name='title' className='bg-transparent w-full px-3 py-1 rounded-md mt-1 outline-none border border-slate-300 dark:border-slate-500' placeholder='Category Name...' id='title' required />
                        </div>
                        <div className='grid grid-cols-2 gap-3'>
                            {/* main category */}
                            <div>
                                <label htmlFor="mainCategory" className='font-semibold'>Select Main Category<span className='text-red-600'>*</span></label>
                                <select onChange={(e) => setSelectedMainCategoryId(e.target.value)} name="mainCategory" className='bg-primary-bg dark:bg-secondary-bg w-full px-3 py-1 rounded-md mt-1 outline-none border border-slate-300 dark:border-slate-500' id="mainCategory" defaultValue={''} required >
                                    <option value="" disabled>Choose one</option>
                                    {
                                        mainCategories?.map(category =>
                                            <option key={category?.id} value={category?.id}>{category?.title}</option>
                                        )
                                    }
                                </select>
                            </div>

                            {/* categories */}
                            <div>
                                <label htmlFor="category" className='font-semibold'>Select Category<span className='text-red-600'>*</span></label>
                                <select name="category" className='bg-primary-bg dark:bg-secondary-bg w-full px-3 py-1 rounded-md mt-1 outline-none border border-slate-300 dark:border-slate-500' id="category" defaultValue={''} required >
                                    <option value="" disabled>Choose one</option>
                                    {
                                        categories?.map(category =>
                                            <option key={category?.id} value={category?.id}>{category?.title}</option>
                                        )
                                    }
                                </select>
                            </div>
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

export default AddSubCategory;