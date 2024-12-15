import AxiosPublic from "../Axios/AxiosPublic"


export const getCounts = async() => {

    const axiosPublic = AxiosPublic();

    const res = await axiosPublic.get('/api/user/orderProductUser/count');

    if(res.data.success){
        return res.data;
    }
    else{
        return false;
    }

}