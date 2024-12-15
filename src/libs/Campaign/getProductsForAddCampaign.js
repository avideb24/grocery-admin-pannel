import AxiosPublic from "../Axios/AxiosPublic";

export const getProductsForAddCampaign = async(query) => {

    const axiosPublic = AxiosPublic();

    const res = await axiosPublic.get('/api/product/offer', { params: query } );

    if(res.data.success){
        return res.data.data;
    }
    else{
        return false;
    }

};