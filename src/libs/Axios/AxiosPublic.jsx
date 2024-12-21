import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://grocery-server-t3mo.onrender.com'
})

const AxiosPublic = () => {
    return axiosPublic;
};

export default AxiosPublic;