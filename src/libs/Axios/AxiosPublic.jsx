import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://grocery-server-1-zfom.onrender.com'
})

const AxiosPublic = () => {
    return axiosPublic;
};

export default AxiosPublic;