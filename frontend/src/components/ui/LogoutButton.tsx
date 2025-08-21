"use client"

import userInstance from '@/services/instances/userInstance';
import captainInstance from '@/services/instances/captainInstance';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const LogoutButton = () => {
    const router = useRouter()

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            const role = localStorage.getItem('role');
            const api = role === 'captain' ? captainInstance : userInstance;
            const res = await api.get(`/logout`, {
                headers: {
                    Authorization: token ? `Bearer ${token}` : ''
                }
            })
            if (res.status === 200) {
                toast.success(res.data?.message || 'Logged out');
                localStorage.removeItem('token');
                localStorage.removeItem('role');
                router.replace(`/login`)
            } else {
                toast.error('Failed to logout');
            }//eslint-disable-next-line
        } catch (err: any) {
            toast.error(err?.response?.data?.message || 'Logout failed');
        }
    }

    return (
        <button onClick={()=>handleLogout()}>Log Out</button>
    )
}

export default LogoutButton