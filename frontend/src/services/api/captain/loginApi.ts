import captainInstance from "@/services/instances/captainInstance"

interface Login{
    email: string
    password: string
}

export const loginApi = {
    loginUser: async ({email, password}: Login) => {
        const {data} = await captainInstance.post(`/login`, {
            email,
            password
        })
        return data;
    }
}