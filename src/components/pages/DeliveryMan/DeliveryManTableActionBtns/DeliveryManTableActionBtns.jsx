'use client';

import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";
import UpdateDeliveryManInfo from "../UpdateDeliveryManInfo/UpdateDeliveryManInfo";
import { showAlertWithTheme } from "@/components/theme/Alert/AlertTheme";
import DeliveryManDetails from "../DeliveryManDetails/DeliveryManDetails";
import AxiosPublic from "@/libs/Axios/AxiosPublic";


const DeliveryManTableActionBtns = ({ deliveryManData }) => {

    const axiosPublic = AxiosPublic();

    // delete fn
    const handleDelete = async (deliveryManId) => {
        const isDarkMode = localStorage.getItem('theme') == 'dark';

        showAlertWithTheme({
            title: "Are you sure?",
            text: `Delete ${deliveryManData?.name}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete"
        }, isDarkMode).then(async (result) => {

            if (result.isConfirmed) {

                const res = await axiosPublic.delete(`/api/deliveryMan/remove/${deliveryManId}`);

                if (res.data.success) {
                    showAlertWithTheme({
                        position: "top-end",
                        icon: "success",
                        title: "Deleted!",
                        showConfirmButton: false,
                        timer: 1500
                    }, isDarkMode);

                    // reload the page
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
                    }, isDarkMode);
                }
            }
        }, isDarkMode);
    };


    return (
        <div className="flex justify-center items-center gap-3">

            {/* ------ details ------ */}
            {/* btn */}
            <button onClick={() => document.getElementById(`my_modal_deliveryManDetail_${deliveryManData?.id}`).showModal()} className="text-base md:text-xl text-green-600" title="Details"><IoGrid /></button>

            {/* modal */}
            <DeliveryManDetails deliveryManData={deliveryManData} />


            {/* ------ update ------ */}
            {/* btn */}
            <button onClick={() => document.getElementById(`my_modal_deliveryManUpdate_${deliveryManData?.id}`).showModal()} className="text-base md:text-xl text-blue-600" title="Update"><FaEdit /></button>
            {/* modal */}
            <UpdateDeliveryManInfo deliveryManData={deliveryManData} />


            {/* ------ delete ------ */}
            {/* delete btn */}
            <button onClick={() => handleDelete(deliveryManData?.id)} className="text-base md:text-xl text-red-600" title="Delete"><FaTrashAlt /></button>

        </div>
    );
};

export default DeliveryManTableActionBtns;