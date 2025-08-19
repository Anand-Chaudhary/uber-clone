"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import logo from '@/assets/logo-removebg.png'

const SignUp = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    fullname: { firstname: '', lastname: '' },
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log({
      email: form.email,
      password: form.password,
      fullname: { firstname: form.fullname.firstname, lastname: form.fullname.lastname },
    })
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

        <button className='bg-black text-white font-semibold mb-7 rounded p-4 w-full' type='submit'>Create account</button>
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