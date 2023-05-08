import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import SideNav from "./components/SideNav";

function AdminPages() {
    return (
        <div className='adminpages'>
            <SideNav />
            <Outlet/>
        </div>
  )
}

export default AdminPages