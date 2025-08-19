import React from 'react'
import Image from 'next/image'
import logo from '@/assets/logo-removebg.png'
import bg from '@/assets/bg.png'
import Link from 'next/link'

const Home = () => {
  return (
    <>
      <div
        className=' min-h-screen w-full flex flex-col justify-between text-black bg-no-repeat bg-cover bg-center'
        style={{ backgroundImage: `url(${bg.src})` }}
      >
        <Image src={logo} alt='Logo' className='w-18 m-8' />
        <div className='bg-white pb-7 p-4'>
          <h2 className='text-3xl font-bold'>Get Started with Uber</h2>
          <Link href={`/login`} className='bg-black flex items-center justify-center text-white w-full py-3 rounded-2xl mt-4'>Continue</Link>
        </div>
      </div>
    </>
  )
}

export default Home