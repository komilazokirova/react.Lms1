import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div>
        <main className='min-h-screen bg-slate-100 flex justify-center items-center'>
            <Outlet/>
        </main>
    </div>
  )
}

export default AuthLayout