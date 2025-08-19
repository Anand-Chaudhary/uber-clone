import axios from "axios"

if(!process.env.NEXT_PUBLIC_BACKEND_URL){
    throw new Error("No backend URL found")
}

const userInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`,
    withCredentials: true,
    headers:{
        "Content-Type": "application/json"
    }
})

export default userInstance