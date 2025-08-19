"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import logo from '@/assets/logo-removebg.png'

const CaptainSignup = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    fullname: { firstname: '', lastname: '' },
    vehicle: { color: '', plate: '', vehicleType: 'Car', capacity: '' },
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log(form)
    setForm({
      email: '',
      password: '',
      fullname: { firstname: '', lastname: '' },
      vehicle: { color: '', plate: '', vehicleType: 'Car', capacity: '' },
    })
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

        <h3 className='text-xl mb-2'>Vehicle details</h3>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 mb-7'>
          <input
            value={form.vehicle.color}
            onChange={(e) => setForm({ ...form, vehicle: { ...form.vehicle, color: e.target.value } })}
            className='bg-[#eeeeee] rounded text-black outline-none p-4 w-full text-lg placeholder:text-base'
            placeholder='Color (e.g., Black)'
            type='text'
            required
          />
          <input
            value={form.vehicle.plate}
            onChange={(e) => setForm({ ...form, vehicle: { ...form.vehicle, plate: e.target.value } })}
            className='bg-[#eeeeee] rounded text-black outline-none p-4 w-full text-lg placeholder:text-base'
            placeholder='Plate number'
            type='text'
            required
          />
          <select
            value={form.vehicle.vehicleType}
            onChange={(e) => setForm({ ...form, vehicle: { ...form.vehicle, vehicleType: e.target.value } })}
            className='bg-[#eeeeee] rounded text-black outline-none p-4 w-full text-lg placeholder:text-base'
          >
            <option value='Car'>Car</option>
            <option value='Bike'>Bike</option>
            <option value='Auto'>Auto</option>
          </select>
          <input
            value={form.vehicle.capacity}
            onChange={(e) => setForm({ ...form, vehicle: { ...form.vehicle, capacity: e.target.value } })}
            className='bg-[#eeeeee] rounded text-black outline-none p-4 w-full text-lg placeholder:text-base'
            placeholder='Capacity (e.g., 4)'
            type='number'
            min={1}
            required
          />
        </div>

        <button className='bg-black text-white font-semibold mb-7 rounded p-4 w-full' type='submit'>Create captain account</button>
        <p className='flex items-center gap-2 justify-center'>
          Already registered?
          <Link href={`/captain-login`} className='text-blue-500 underline'>Log-in</Link>
        </p>
      </form>

      <Link href={`/sign-up`}>
        <button className='bg-[#10b461] text-white font-semibold mb-7 rounded p-4 w-full'>Sign-up as User</button>
      </Link>
    </div>
  )
}

export default CaptainSignup