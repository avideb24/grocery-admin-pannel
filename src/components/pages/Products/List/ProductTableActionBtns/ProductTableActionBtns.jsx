'use client';

import React from 'react';
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { BiDetail } from "react-icons/bi";
import ProductDetail from '../ProductDetail/ProductDetail';
import ProductUpdate from '../ProductUpdate/ProductUpdate';
import AxiosPublic from '@/libs/Axios/AxiosPublic';
import { showAlertWithTheme } from '@/components/theme/Alert/AlertTheme';
import { FaListAlt } from "react-icons/fa";


const ProductTableActionBtns = ({ product }) => {

    const axiosPublic = AxiosPublic();

    // delete fn
    const handleDelete = async (productId) => {

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
                const res = await axiosPublic.delete(`/api/product/remove/${productId}`);

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
                    title: "Something Went Wrong!",
                    icon: "error",
                }, isDarkMode);
            }
        }
    };

    return (
        <div className='flex justify-center items-center gap-2 md:gap-3'>

            {/* detail modal btn */}
            <button onClick={() => document.getElementById(`my_modal_showDetail_${product?.id}`).showModal()} className='text-base md:text-xl text-green-600' title='Product Detail'><FaListAlt /></button>
            {/* detail modal */}
            <ProductDetail product={product} />

            {/* update btn */}
            <button onClick={() => document.getElementById(`my_modal_updateProduct_${product?.id}`).showModal()} className='text-base md:text-xl text-blue-600' title='Product Update'><FaEdit /></button>
            {/* update modal body */}
            <ProductUpdate product={product} />

            <button onClick={() => handleDelete(product?.id)} className='text-base md:text-xl text-red-600' title='Product Delete'><FaTrashAlt /></button>

        </div>
    );
};

export default ProductTableActionBtns;