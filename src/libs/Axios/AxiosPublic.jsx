import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://grocery-server-rq6t.onrender.com'
})

const AxiosPublic = () => {
    return axiosPublic;
};

export default AxiosPublic;