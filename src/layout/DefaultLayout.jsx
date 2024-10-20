import React, { memo } from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
export default function DefaultLayout() {
  return (
    <div className='flex'>
        <Sidebar/>
        <Outlet/>
    </div>
  )
}
