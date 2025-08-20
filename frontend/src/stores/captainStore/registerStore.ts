import { registerApi } from "@/services/api/captain/registerApi";
import { Captain } from "@/types/captain.types";
import { create } from "zustand";

interface RegisterState{
    loading: boolean,
    success: boolean,
    message: string | null,
    error: string | null,
    token: string | null,
    register: (data: Captain)=> Promise<void>
}

export const registerCaptainStore = create<RegisterState>((set)=>({
    loading: false,
    success: false,
    error: null,
    message: null,
    token: null,

    register: async (data) =>{
        set({
            loading: true, 
            error: null,
            success: false,
            message: null,
            token: null
        })

        try{
            const res = await registerApi.createCaptain(data)
            const ok = res?.success === true;
            const msg = res?.message as string | undefined;
            const token = res?.token as string

            if(ok){
                set({ loading: false, success: true, token: null, error: null, message: msg || 'Captain registered successfully' })
                localStorage.setItem("token", token)
                localStorage.setItem('role', 'captain')
            } else {
                set({ loading: false, success: false, token: null, error: msg || 'User Registration Failed', message: msg || null })
            }
        //eslint-disable-next-line
        } catch(err: any){

        }
    }
}))