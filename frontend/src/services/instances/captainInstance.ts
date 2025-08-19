import axios from "axios";

if(!process.env.NEXT_PUBLIC_BACKEND_URL){
    throw new Error ("No Backend URL found")
}

const captainInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/captain`,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
})

export default captainInstance