'use client';

import { showAlertWithTheme } from '@/components/theme/Alert/AlertTheme';
import AxiosPublic from '@/libs/Axios/AxiosPublic';
import Image from 'next/image';
import React, { useState } from 'react';
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const MainCategoryActionBtns = ({ category }) => {

    const [productTitle, setProductTitle] = useState('');
    const [titleError, setTitleError] = useState(false);
    const [iconPreview, setIconPreview] = useState(category?.icon || null);
    const [loading, setLoading] = useState(false);
    const axiosPublic = AxiosPublic();

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
            setIconPreview(category?.icon || null); // Reset to default icon if no file is selected
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

    // update category fn
    const handleAddCategory = async (e) => {
        e.preventDefault();
        setLoading(true);

        const isDarkMode = localStorage.getItem('theme') == 'dark';

        const formData = new FormData();
        const title = e.target.title.value;
        const iconFile = e.target.icon.files[0];

        formData.append('title', title);

        // Append icon file only if a new one is selected
        if (iconFile) {
            formData.append('mainCategory', iconFile);
        }

        const res = await axiosPublic.patch(`/api/mainCategory/update/${category?.id}`, formData, {
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
            setLoading(false);
            e.target.reset();
            setIconPreview(null);

            showAlertWithTheme({
                position: "top-end",
                icon: "error",
                title: "Something went Wrong!",
                showConfirmButton: false,
                timer: 1500
            }, isDarkMode);

        }
        // refresh the window
        setTimeout(() => {
            window.location.reload();
        }, 1400);
        document.getElementById(`my_modal_${category?.id}`).close();

    };


    // delete fn
    const handleDelete = async (categoryId) => {
        const isDarkMode = localStorage.getItem('theme') === 'dark';

        const result = await showAlertWithTheme({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete"
        }, isDarkMode);

        if (result.isConfirmed) {
            try {
                const res = await axiosPublic.delete(`/api/mainCategory/remove/${categoryId}`);

                if (res.data.success) {
                    showAlertWithTheme({
                        position: "top-end",
                        icon: "success",
                        title: "Deleted!",
                        showConfirmButton: false,
                        timer: 1500
                    }, isDarkMode);
                } else {
                    showAlertWithTheme({
                        position: "top-end",
                        icon: "error",
                        title: "Failed To Delete!",
                        showConfirmButton: false,
                        timer: 1500
                    }, isDarkMode);
                }
                // refresh the window
                setTimeout(() => {
                    window.location.reload();
                }, 1400);
            } catch (error) {
                // console.error('Error deleting category:', error);
                showAlertWithTheme({
                    title: "Error!",
                    icon: "error",
                }, isDarkMode);
            }
        }
    };



    return (
        <div className='flex justify-center items-center gap-2 md:gap-5'>

            {/* Update button */}
            <button className="text-blue-600 text-base md:text-xl" onClick={() => document.getElementById(`my_modal_${category?.id}`).showModal()}><FaEdit /></button>

            <dialog id={`my_modal_${category?.id}`} className="modal">
                <div className="modal-box bg-primary-bg dark:bg-secondary-bg text-primary-text dark:text-secondary-text">
                    {/* Close button */}
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

                    <h2 className='text-center text-base md:text-lg font-bold border-b border-b-slate-300 dark:border-b-slate-500 pb-1 mb-4'>Update Main Category</h2>

                    <form onSubmit={handleAddCategory} className='text-left space-y-3'>
                        {/* Title */}
                        <div>
                            <label htmlFor="title" className='font-semibold'>Category Name<span className='text-red-600'>*</span>
                                {
                                    titleError && <span className='font-normal text-[10px] md:text-xs text-red-600 pl-5'>(please remove special characters)</span>
                                }
                            </label>
                            <input type="text" onChange={(e) => handleCheckTitle(e)} name='title' defaultValue={category?.title} className='bg-transparent w-full px-3 py-1 rounded-md mt-1 outline-none border border-slate-300 dark:border-slate-500' placeholder='Category Name...' id='title' required />
                        </div>
                        {/* File */}
                        <div>
                            <label htmlFor="icon" className='font-semibold'>Category Icon<span className='text-red-600'>*</span>

                            </label>
                            <input type="file" name='icon' className='bg-transparent w-full px-3 py-1 rounded-md mt-1 outline-none border border-slate-300 dark:border-slate-500 mb-3 cursor-pointer' id='icon' onChange={handleFileChange} />
                            {iconPreview && (
                                <div className='mt-2'>
                                    <Image src={iconPreview} className='w-20 h-20 object-contain rounded-md' width={100} height={100} alt="Icon Preview" />
                                </div>
                            )}
                        </div>
                        {/* Submit button */}
                        <button type='submit' className={`${titleError ? 'cursor-not-allowed' : 'cursor-pointer'} bg-primary-color text-secondary-text w-full px-3 py-1 rounded-md mt-1 outline-none cursor-pointer`} disabled={titleError} >
                            {loading ? <span className="loading loading-spinner loading-md"></span> : <span>Save</span>}
                        </button>
                    </form>
                </div>
            </dialog>


            {/* delete btn */}
            <button className='text-red-600 text-base md:text-xl' onClick={() => handleDelete(category?.id)} >
                <FaTrashAlt />
            </button>

        </div>
    );
};

export default MainCategoryActionBtns;
