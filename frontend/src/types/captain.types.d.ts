export interface Captain{
    fullname:{
        firstname: string
        lastname: string
    }
    email: string
    password: string
    vehicle:{
        color: string
        plate: string
        vehicleType: string,
        capacity: number
    }
}