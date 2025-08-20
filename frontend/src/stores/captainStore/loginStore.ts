import { loginApi } from "@/services/api/user/loginApi"
import { create } from "zustand"

interface LoginUserStates{
    loading: boolean
    error: string | null
    success: boolean
    token: string | null
    message: string | null
    login: (data: {email: string, password: string})=> Promise<void>
}

export const loginCatainStore = create<LoginUserStates>((set)=>({
    loading: false,
    error: null,
    success: false,
    message: null,
    token: null,

    login: async (data) => {
        set({loading: true, success: false, error: null, message: null});
        try{
            const res = await loginApi.loginUser(data);

            const ok = res?.success === true;
            const msg = res?.message as string | undefined;
            const token = res?.token as string

            if (ok) {
                set({loading: false, success: true, error: null, message: msg || 'User Logged-In'})
                localStorage.setItem('token', token)
                localStorage.setItem('role', 'captain')
            } else {
                set({loading: false, success: false, error: msg || 'Failed to login User', message: msg || null})
            }
            //eslint-disable-next-line
        } catch(err: any){
            console.log(err);
            set({
                loading: false,
                success: false,
                error: err?.response?.data?.message || `Failed to login User`,
                message: err?.response?.data?.message || null
            })
        }
    },
}))