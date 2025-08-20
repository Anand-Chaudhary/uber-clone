import captainInstance from "@/services/instances/captainInstance"
import { Captain } from "@/types/captain.types";

export const registerApi = {
    createCaptain: async ({fullname, email, password, vehicle}: Captain)=>{
        const {data} = await captainInstance.post(`/register`,{
            fullname,
            email,
            password,
            vehicle
        })
        return data;
    }
}