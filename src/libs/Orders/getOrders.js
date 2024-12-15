import AxiosPublic from "../Axios/AxiosPublic"


export const getOrders = async(queryData) => {

    const axiosPublic = AxiosPublic();

    const res = await axiosPublic.get('/api/order/table', { params: queryData });

    return res.data;

}