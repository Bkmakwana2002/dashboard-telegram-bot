import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
 
 const navigate = useNavigate()

 function handleCallback (res) {
   console.log(res.credential)
   localStorage.setItem("auth",res.credential)
   navigate('/')
 }

 useEffect(() => {
   /* global google */
   google.accounts.id.initialize({
    client_id : `${import.meta.env.VITE_GOOGLE_CLIENT_ID}`,
    callback : handleCallback
   })
   google.accounts.id.renderButton(
    document.getElementById('button'),
    {theme : "outline",size : "large"}
   )
 }, [])
 

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
      </div>
      <div id="button" className="mt-4"></div>
    </div>
  </div>
  )
}

export default Login