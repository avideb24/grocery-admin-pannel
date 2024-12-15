import { showAlertWithTheme } from "@/components/theme/Alert/AlertTheme";
import AxiosPublic from "../Axios/AxiosPublic"


export const getDeliveryManDropDown = async() => {

    const axiosPublic = AxiosPublic();

    const res = await axiosPublic.get('/api/deliveryMan/all');

    if(res.data.success){
        return res.data.data;
    }
    return false;

}