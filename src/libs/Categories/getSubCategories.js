
import AxiosPublic from "../Axios/AxiosPublic"


export const getSubCategories = async(id) => {

    const axiosPublic = AxiosPublic();

    const res = await axiosPublic.get(`/api/user/subCategory/category/${id}`);


    return res.data.data;

}