import userInstance from "@/services/instances/userInstance"

interface Login{
    email: string
    password: string
}

export const loginApi = {
    loginUser: async ({email, password}: Login) => {
        const {data} = await userInstance.post(`/login`, {
            email,
            password
        })
        return data;
    }
}