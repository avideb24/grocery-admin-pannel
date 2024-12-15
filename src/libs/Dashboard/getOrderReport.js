import AxiosPublic from "../Axios/AxiosPublic"


export const getOrderReport = async(query) => {

    const axiosPublic = AxiosPublic();

    const res = await axiosPublic.get('/api/order/countByStatus', {params: query});

    if(res.data.success){
        return res.data.data;
    }
    else{
        false;
    }

}