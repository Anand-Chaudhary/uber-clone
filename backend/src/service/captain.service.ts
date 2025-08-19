import CaptainModel, { Captain } from "../models/captain.model";

interface RegisterCaptain{
    firstname: string
    lastname: string,
    email: string
    password: string
    color: string,
    plate: string
    capacity: number
    vehicleType: string
}

export const registerCaptain = async ({
    firstname,
    lastname,
    email,
    password,
    color,
    plate,
    capacity,
    vehicleType
}: RegisterCaptain): Promise<Captain> =>{
if(!firstname || !email || !password || !color || !plate || !capacity || !vehicleType){
        throw new Error("All fields are required");
    }
    const captain = await CaptainModel.create({
        fullname:{
            firstname, lastname
        },
        email,
        password,
        vehicle:{
            color,
            plate,
            capacity,
            vehicleType
        }
    })
    return captain
}