import AxiosPublic from "../Axios/AxiosPublic"


export const getAllStories = async() => {

const axiosPublic = AxiosPublic();

const res = await axiosPublic.get('/api/story/all');

if(res.data.success){
    return res.data.data
}
else{
    return false;
}

}