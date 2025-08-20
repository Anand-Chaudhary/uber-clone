"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')
    if (token && role === 'user') {
      setAuthorized(true)
    } else {
      router.replace('/login')
    }
    setChecked(true)
  }, [router])

  if (!checked) return <div className='p-7'>Loading...</div>
  if (!authorized) return null

  return <>{children}</>
}
