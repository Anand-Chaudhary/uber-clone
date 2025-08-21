"use client"

import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import logo from '@/assets/logo-removebg.png'
import Link from 'next/link'
import { loginStore } from '@/stores/userStore/loginStore'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

const Login = () => {
    const router = useRouter()
    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const { loading, error, success, login, message, reset } = loginStore()

    // Clear any stale success/message state when visiting login to avoid redirect loops
    useEffect(() => {
        reset()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const token = localStorage.getItem('token')
        const role = localStorage.getItem('role')
        if (token && (role === 'captain' || role === 'user')) {
            if (role === 'captain') router.push(`/captain/home`)
            else router.push(`/user/home`)
        } else if (token && !role) {
            // Clear stale token without role to prevent redirect loop
            localStorage.removeItem('token')
            localStorage.removeItem('role')
        }
    }, [router])

    useEffect(() => {
        if (message) {
            if (success) toast.success(message)
            else toast.error(message || error || 'Something went wrong')
        }
    }, [message, success, error])

    useEffect(() => {
        if (success) {
            const role = localStorage.getItem('role')
            if (role === 'captain') router.push(`/captain/home`)
            else router.push(`/user/home`)
        }
    }, [success, router])

    //eslint-disable-next-line
    const handleSubmit = (e: any) => {
        e.preventDefault();
        login(form)
        setForm({ ...form, email: "", password: "" })
    }

    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <form onSubmit={handleSubmit}>
                <Image src={logo} alt='Logo' className='w-18 mb-4' priority />
                <h3 className='text-xl mb-2'>What&apos;s your email</h3>
                <input
                    value={form.email}
                    onChange={
                        (e) => setForm({ ...form, email: e.target.value })
                    }
                    className='bg-[#eeeeee] rounded text-black outline-none p-4 mb-7 w-full text-lg placeholder:text-base'
                    placeholder='youremail@example.com'
                    type="email"
                    required
                />

                <h3 className='text-xl mb-2'>Enter password</h3>
                <input
                    value={form.password}
                    className='bg-[#eeeeee] rounded text-black outline-none p-4 mb-7 w-full text-lg placeholder:text-base'
                    type="password"
                    placeholder='Password'
                    onChange={
                        (e) => setForm({
                            ...form,
                            password: e.target.value
                        })

                    }
                />

                <button className={`${loading ? `bg-gray-500 cursor-not-allowed` : `bg-black cursor-pointer`} w-full text-white font-semibold mb-7 rounded p-4 w-full' type='submit'`}>
                    {
                        loading ?
                            <p className='flex gap-8'>
                                <Loader2 className='h-4 w-4 animate-spin' />
                                Wait...
                            </p> : <p>Log-In</p>
                    }
                </button>

                {/* Toasts handled via useEffect to avoid firing on every render */}

                <p className='flex items-center gap-2 justify-center'>
                    New here?
                    <Link href={`/sign-up`} className='text-blue-500 underline'>Create new account</Link>
                </p>
            </form>

            <Link href={`/captain-login`}>
                <button className='bg-[#10b461] text-white font-semibold mb-7 rounded p-4 w-full'>Sign-in as Captain</button>
            </Link>
        </div>
    )
}

export default Login