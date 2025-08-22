"use client"

import Image from 'next/image'
import React, { useRef, useState } from 'react'
import logo from '@/assets/logo-removebg.png'
import map from '@/assets/map.png'
import { Bike, Car, IndianRupee, Truck, User, X } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import LocationSearchPanel from '@/components/ui/LocationSearchPanel'

const UserHome = () => {

  const [form, setForm] = useState({
    pickup: "",
    destination: ""
  })
  const [panel, setPanel] = useState<boolean>(false)
  const [vehiclePanel, setVehiclePanel] = useState<boolean>(false)
  const panelRef = useRef(null)
  const heightRef = useRef(null)
  const vehicleRef = useRef(null)


  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault()
  }

  useGSAP(() => {
    if (panel) {
      gsap.to(
        panelRef.current, {
        display: 'block',
        height: "80%",
        duration: 2,
      }
      )
      gsap.to(
        heightRef.current, {
        height: '100vh',
        duration: 2,
      }
      )
    } else {
      gsap.to(
        panelRef.current, {
        duration: 2,
        display: "none",
        height: '0%'
      }
      )
      gsap.to(
        heightRef.current, {
        height: "20%",
        duration: 2,
      }
      )
    }
  }, [panel])

  useGSAP(() => {
    if (vehiclePanel) {
      gsap.to(
        vehicleRef.current, {
        transform: 'translateY(0)'
      }
      )
    } else {
      gsap.to(
        vehicleRef.current, {
        transform: 'translateY(100%)'
      }
      )
    }
  }, [vehiclePanel])

  return (
    <>
      <div className='w-full flex flex-col justify-between h-screen' style={{ backgroundImage: `url(${map.src})` }}>
        <Image src={logo} alt='Logo' className='w-18 mx-7 z-10 mb-4' priority />
        <div ref={heightRef} className={`bg-white relative w-full flex flex-col justify-end gap-5 p-5`}>
          <div>
            <div className='flex items-center justify-between'>
              <h4 className='text-3xl rounded-4xl font-semibold mb-4'>Find Trip</h4>
              <X onClick={() => setPanel(false)} className={`${panel ? `block` : `hidden`} cursor-pointer`} />
            </div>
            <form onClick={() => setPanel(true)} onSubmit={(e: React.FormEvent) => submitHandler(e)} className='flex relative flex-col gap-4'>
              <div className="line absolute h-20 w-1 rounded-full top-[15%] left-5 bg-black"></div>
              <input value={form.pickup} onChange={(e) => setForm({ ...form, pickup: e.target.value })} required className='bg-[#eeeeee] px-8 text-lg rounded-lg py-2' type="text" placeholder='Add a pick-up location' />
              <input value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })} required className='bg-[#eeeeee] px-8 text-lg rounded-lg py-2' type="text" placeholder='Enter your destination' />
            </form>
          </div>
          <div ref={panelRef}>
            <LocationSearchPanel setPanel={setPanel} setVehiclePanel={setVehiclePanel} />
          </div>
          {/* vehicle panel */}
          <div ref={vehicleRef} className='fixed left-0 flex flex-col translate-y-full gap-5 bg-white right-0 bottom-0 z-10 p-5'>
            <h3 className='text-xl font-semibold flex justify-between'>
              Choose Your Vehicle
              <X onClick={() => setVehiclePanel(false)} className={`cursor-pointer`} />
            </h3>
            <div className='rounded-xl border-2 active:border-black p-4'>
              <div className='flex items-center justify-between gap-4'>
                <Car className='h-16 w-16' />
                <div className='flex-1'>
                  <p className='flex gap-3 font-medium text-base items-center'>
                    Uber Go
                    <span className='flex items-center gap-1'><User className='h-4 w-4' /> 3</span>
                  </p>
                  <p className='font-medium text-sm text-gray-700'>2 mins away</p>
                  <p className='font-normal text-gray-500 text-xs'>Affordable Compact Rides</p>
                </div>
                <p className='flex text-xl items-center font-semibold'>
                  <IndianRupee className='h-4' /> 193
                </p>
              </div>
            </div>
            <div className='rounded-xl border-2 active:border-black p-4'>
              <div className='flex items-center justify-between gap-4'>
                <Bike className='h-16 w-16' />
                <div className='flex-1'>
                  <p className='flex gap-3 font-medium text-base items-center'>
                    Uber Moto
                    <span className='flex items-center gap-1'><User className='h-4 w-4' /> 1</span>
                  </p>
                  <p className='font-medium text-sm text-gray-700'>2 mins away</p>
                  <p className='font-normal text-gray-500 text-xs'>Affordable Bike Rides</p>
                </div>
                <p className='flex text-xl items-center font-semibold'>
                  <IndianRupee className='h-4' /> 65
                </p>
              </div>
            </div>
            <div className='rounded-xl border-2 active:border-black p-4'>
              <div className='flex items-center justify-between gap-4'>
                <Truck className='h-16 w-16' />
                <div className='flex-1'>
                  <p className='flex gap-3 font-medium text-base items-center'>
                    Uber Auto
                    <span className='flex items-center gap-1'><User className='h-4 w-4' /> 4</span>
                  </p>
                  <p className='font-medium text-sm text-gray-700'>2 mins away</p>
                  <p className='font-normal text-gray-500 text-xs'>Affordable Auto Rides</p>
                </div>
                <p className='flex text-xl items-center font-semibold'>
                  <IndianRupee className='h-4' /> 120
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserHome