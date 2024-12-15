import AxiosPublic from "../Axios/AxiosPublic"


export const getAllCampaigns = async() => {

const axiosPublic = AxiosPublic();

const res = await axiosPublic.get('/api/offer/card');

if(res.data.success){
    return res.data.data
}
else{
    return false;
}

}