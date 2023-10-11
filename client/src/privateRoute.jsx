import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
  
  const user = localStorage.getItem('auth')
  return (
    <>
      { (user !== null) ? <Outlet/> : <Navigate to='/login'/> }
    </>
  )
}

export default PrivateRoutes