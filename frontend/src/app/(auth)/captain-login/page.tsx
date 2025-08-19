"use client"

import Image from 'next/image'
import React, { useState } from 'react'
import logo from '@/assets/logo-removebg.png'
import Link from 'next/link'
import {MoveRight} from 'lucide-react'

const CaptainLogin = () => {
    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    //eslint-disable-next-line
    const handleSubmit = (e: any) => {
        e.preventDefault()
        console.log(form);
        setForm({ ...form, email: "", password: "" })
    }

    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <form onSubmit={handleSubmit}>
                <div>
                    <Image src={logo} alt='Logo' className='w-18 mb-4' priority />
                    <MoveRight />
                </div>
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

                <button className='bg-black text-white font-semibold mb-7 rounded p-4 w-full' type='submit'>Log-In</button>
                <p className='flex items-center gap-2 justify-center'>
                    Want to join?
                    <Link href={`/captain-signup`} className='text-blue-500 underline'>Create new account</Link>
                </p>
            </form>

            <Link href={`/login`}>
                <button className='bg-[#10b461] text-white font-semibold mb-7 rounded p-4 w-full'>Sign-in as User</button>
            </Link>
        </div>
    )
}

export default CaptainLogin