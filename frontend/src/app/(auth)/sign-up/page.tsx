"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import logo from '@/assets/logo-removebg.png'
import { registerStore } from '@/stores/userStore/registerStore'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

const SignUp = () => {

  const router = useRouter()
  const [form, setForm] = useState({
    email: '',
    password: '',
    fullname: { firstname: '', lastname: '' },
  })

  const { loading, error, register, success, message } = registerStore()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const role = localStorage.getItem('role')
      if (role === 'captain') router.push(`/captain/home`)
      else router.push(`/user/home`)
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

  // eslint-disable-next-line
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await register(form);

    setForm({ email: '', password: '', fullname: { firstname: '', lastname: '' } })
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <form onSubmit={handleSubmit}>
        <Image src={logo} alt='Logo' className='w-18 mb-4' priority />

        <h3 className='text-xl mb-2'>What&apos;s your name</h3>
        <div className='flex gap-3 mb-7'>
          <input
            value={form.fullname.firstname}
            onChange={(e) => setForm({ ...form, fullname: { ...form.fullname, firstname: e.target.value } })}
            className='bg-[#eeeeee] rounded text-black outline-none p-4 w-1/2 text-lg placeholder:text-base'
            placeholder='First name'
            type='text'
            minLength={3}
            required
          />
          <input
            value={form.fullname.lastname}
            onChange={(e) => setForm({ ...form, fullname: { ...form.fullname, lastname: e.target.value } })}
            className='bg-[#eeeeee] rounded text-black outline-none p-4 w-1/2 text-lg placeholder:text-base'
            placeholder='Last name (optional)'
            type='text'
          />
        </div>

        <h3 className='text-xl mb-2'>What&apos;s your email</h3>
        <input
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className='bg-[#eeeeee] rounded text-black outline-none p-4 mb-7 w-full text-lg placeholder:text-base'
          placeholder='youremail@example.com'
          type='email'
          required
        />

        <h3 className='text-xl mb-2'>Create a password</h3>
        <input
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className='bg-[#eeeeee] rounded text-black outline-none p-4 mb-7 w-full text-lg placeholder:text-base'
          placeholder='Minimum 6 characters'
          type='password'
          minLength={6}
          required
        />

        <button className={`${loading ? "bg-gray-500 cursor-not-allowed" : "bg-black cursor-pointer"} text-white w-full font-semibold mb-7 rounded p-4 w-full' type='submit'`}>
          {loading ?
            <p className='flex gap-2'>
              <Loader2 className='h-4 w-4 animate-spin' /> Wait...
            </p> : <p>Create account</p>}
        </button>

        {/* Toasts handled via useEffect to avoid firing on every render */}

        <p className='flex items-center gap-2 justify-center'>
          Already have an account?
          <Link href={`/login`} className='text-blue-500 underline'>Log-in</Link>
        </p>
      </form>

      <Link href={`/captain-signup`}>
        <button className='bg-[#10b461] text-white font-semibold mb-7 rounded p-4 w-full'>Sign-up as Captain</button>
      </Link>
    </div>
  )
}

export default SignUp