import AxiosPublic from "../Axios/AxiosPublic"


export const getAllDeliveryMan = async(query) => {

    const axiosPublic = AxiosPublic();

    const res = await axiosPublic.get('/api/deliveryMan/table', { params: query });

    if(res.data.success){
        return res.data;
    }

}