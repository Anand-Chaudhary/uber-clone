import { registerApi } from "@/services/api/user/registerApi"
import { User } from "@/types/user.types"
import { create } from "zustand"

interface RegisterState {
    loading: boolean,
    error: string | null
    success: boolean,
    message: string | null,
    register: (data: User) => Promise<void>
}


export const registerStore = create<RegisterState>((set) => ({
    loading: false,
    error: null,
    success: false,
    message: null,

    register: async (data) => {
        set({ loading: true, error: null, success: false, message: null })
        try {
            const res = await registerApi.createUser(data);
            console.log(res);

            const ok = res?.success === true;
            const msg = res?.message as string | undefined;

            if (ok) {
                set({ loading: false, success: true, error: null, message: msg || 'User registered successfully' })
            } else {
                set({ loading: false, success: false, error: msg || 'User Registration Failed', message: msg || null })
            }
            //eslint-disable-next-line
        } catch(err: any){
            set({
                loading: false,
                success: false,
                error: err?.response?.data?.message || `User Registration Failed`,
                message: err?.response?.data?.message || null
            })
            console.log(err);            
        }
    }
}))