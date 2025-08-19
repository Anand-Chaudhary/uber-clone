import userInstance from "@/services/instances/userInstance"
import { User } from "@/types/user.types"

export const registerApi = {
    createUser: async ({fullname, email, password}: User)=>{
        const {data} = await userInstance.post(`/register`, {
            fullname,
            email, 
            password
        })
        return data;
    }
}