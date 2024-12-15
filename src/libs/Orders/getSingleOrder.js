import AxiosPublic from "../Axios/AxiosPublic"


export const getSingleOrder = async(orderId) => {

    const axiosPublic = AxiosPublic();

    const res = await axiosPublic.get(`/api/order/single/${orderId}`);

    if(res.data.success){
        return res.data.data;
    }
    else{
        return false;
    }

}