import AxiosPublic from "../Axios/AxiosPublic"


export const getMainCategories = async() => {

    const axiosPublic = AxiosPublic();

    const res = await axiosPublic.get('/api/user/mainCategory/all');


    return res.data;

}