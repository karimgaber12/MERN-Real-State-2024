/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
export default function Signin() {
  const [formData, setFormData] = useState({})
  const [error, setError] = useState(null);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>{
    // get the data from the form
    setFormData({
        ...formData,
        [e.target.id]: e.target.value,
    });
  };
  console.log(formData)

  // submit the data
  const hanldeSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('api/auth/signin',
        {
          method:'post',
          headers:{
            'content-type': 'application/json'
          },
          body:JSON.stringify(formData)
        })
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);      
      setError(null)
      navigate('/')
    } catch (error) {
      setLoading(false)
      setError(error.message)
    }
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold
      my-7'>Sign In</h1>
      <form onSubmit={hanldeSubmit} className='flex flex-col gap-4'>
        <input type='email' placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
        <input type='password' placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? "LOADING..." : "Sign in"}</button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Do not have an account?</p>
        <Link to='/sign-up'>
          <span className='text-blue-700'>Sign Up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}