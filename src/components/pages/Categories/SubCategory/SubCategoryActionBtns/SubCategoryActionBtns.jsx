'use client';

import { showAlertWithTheme } from '@/components/theme/Alert/AlertTheme';
import AxiosPublic from '@/libs/Axios/AxiosPublic';
import { getMainCategories } from '@/libs/Categories/getMainCategories';
import { getCategories } from '@/libs/Categories/getSubCategory';
import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const SubCategoryActionBtns = ({ subCategory }) => {

    const [mainCategories, setMainCategories] = useState([]);
    const [mainCategoryId, setMainCategoryId] = useState(null);
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState(null);
    const [productTitle, setProductTitle] = useState('');
    const [titleError, setTitleError] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState(categoryId ? categoryId : null);
    const [loading, setLoading] = useState(false);
    const axiosPublic = AxiosPublic();


    console.log(subCategory);
    

    // load main category
    useEffect(() => {

        const fetchMainCategories = async () => {
            const res = await getMainCategories();
            setMainCategories(res.data);
        };

        fetchMainCategories();

    }, []);

    // load categories
    useEffect(() => {

        if (mainCategoryId) {
            const fetchCategories = async () => {
                const res = await getCategories(mainCategoryId);
                setCategories(res.data);
            };

            fetchCategories();
        }

    }, [mainCategoryId])


    // update sub category fn
    const handleAddCategory = async (e) => {
        e.preventDefault();
        setLoading(true);

        const isDarkMode = localStorage.getItem('theme') == 'dark';

        const updatedData = {
            title: e.target.title.value,
            categoryId: selectedCategoryId
        };

        const res = await axiosPublic.patch(`/api/subCategory/update/${subCategory?.id}`, updatedData);

        if (res.data.success) {
            setLoading(false);
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
            setLoading(false);
            e.target.reset();

            showAlertWithTheme({
                position: "top-end",
                icon: "error",
                title: "Something went Wrong!",
                showConfirmButton: false,
                timer: 1500
            }, isDarkMode);
        }

        // close modal
        document.getElementById(`my_modal_${subCategory?.id}`).close();
        // refresh the window
        setTimeout(() => {
            window.location.reload();
        }, 1500);

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

    // delete fn
    const handleDelete = async (subCategoryId) => {
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
                const res = await axiosPublic.delete(`/api/subCategory/remove/${subCategoryId}`);

                if (res.data.success) {
                    showAlertWithTheme({
                        title: "Deleted!",
                        icon: "success",
                    }, isDarkMode);
                }
                else {
                    showAlertWithTheme({
                        title: "Failed to Delete!",
                        icon: "error",
                    }, isDarkMode);
                }

                // refresh the window
                setTimeout(() => {
                    window.location.reload();
                }, 1600);

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
            <button className="text-blue-600 text-base md:text-xl" onClick={() => document.getElementById(`my_modal_${subCategory?.id}`).showModal()}><FaEdit /></button>

            <dialog id={`my_modal_${subCategory?.id}`} className="modal">
                <div className="modal-box bg-primary-bg dark:bg-secondary-bg text-primary-text dark:text-secondary-text">
                    {/* Close button */}
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

                    <h2 className='text-center text-base md:text-lg font-bold border-b border-b-slate-300 dark:border-b-slate-500 pb-1 mb-4'>Update Sub Category</h2>

                    <form onSubmit={handleAddCategory} className='text-left space-y-3'>
                        {/* Title */}
                        <div>
                            <label htmlFor="title" className='font-semibold'>Category Name<span className='text-red-600'>*</span>
                                {
                                    titleError && <span className='font-normal text-[10px] md:text-xs text-red-600 pl-5'>(please remove special characters)</span>
                                }
                            </label>
                            <input type="text" onChange={(e) => handleCheckTitle(e)} name='title' defaultValue={subCategory?.title} className='bg-transparent w-full px-3 py-1 rounded-md mt-1 outline-none border border-slate-300 dark:border-slate-500' placeholder='Category Name...' id='title' required />
                        </div>

                        {/* main categories */}
                        <div>
                            <label htmlFor="category" className='font-semibold'>Select Main Category<span className='text-red-600'>*</span></label>
                            <select onChange={(e) => setMainCategoryId(e.target.value)} name="mainCategory" className='bg-primary-bg dark:bg-secondary-bg w-full px-3 py-1 rounded-md mt-1 outline-none border border-slate-300 dark:border-slate-500' id="mainCategory" defaultValue={""} required >
                                <option value="" disabled>Choose one</option>
                                {
                                    mainCategories?.map(mainCategory =>
                                        <option key={mainCategory?.id} value={mainCategory?.id}>{mainCategory?.title}</option>
                                    )
                                }
                            </select>
                        </div>
                        {/* categories */}
                        <div>
                            <label htmlFor="category" className='font-semibold'>Select Category<span className='text-red-600'>*</span></label>
                            <select onChange={(e) => setSelectedCategoryId(e.target.value)} name="category" className='bg-primary-bg dark:bg-secondary-bg w-full px-3 py-1 rounded-md mt-1 outline-none border border-slate-300 dark:border-slate-500' id="category" defaultValue={selectedCategoryId} required >
                                <option value="" disabled>Choose one</option>
                                {
                                    categories?.map(category =>
                                        <option key={category?.id} value={category?.id}>{category?.title}</option>
                                    )
                                }
                            </select>
                        </div>

                        {/* Submit button */}
                        <button type='submit' className={`${titleError ? 'cursor-not-allowed' : 'cursor-pointer'} bg-primary-color text-secondary-text w-full px-3 py-1 rounded-md mt-1 outline-none`} disabled={titleError}>
                            {loading ? <span className="loading loading-spinner loading-md"></span> : <span>Save</span>}
                        </button>
                    </form>
                </div>
            </dialog>


            {/* delete btn */}
            <button className='text-red-600 text-base md:text-xl' onClick={() => handleDelete(subCategory?.id)} >
                <FaTrashAlt />
            </button>

        </div>
    );
};

export default SubCategoryActionBtns;
