import React, { use } from 'react'
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

import { useState } from 'react';
import {useDispatch} from "react-redux";
import { useEffect } from 'react';
import {loginUserThunk} from "../../store/slice/user/userThunk";
import { toast } from 'react-hot-toast';

import { useSelector } from 'react-redux';

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    
    const [loginData,setLoginData]=useState({
        username:"",
        password:"",
    })

   const {isAuthenticated} = useSelector(state => state.userReducer);

    useEffect(() => {
        if(isAuthenticated) navigate('/');
    }, [isAuthenticated]);            

    const handleInputChange=(event)=>{
        setLoginData({...loginData,[event.target.name]:event.target.value})
        
    }


    const handleLogin=async()=>{
    
       const response=await dispatch(loginUserThunk(loginData));

        if(response?.payload?.success){
            navigate('/');

         }
  
    
    }

  return (
      <div className='flex justify-center items-center p-6 min-h-screen'>
          <div className="max-w-[40rem] w-full flex flex-col gap-5 bg-base-200 p-6 rounded-3xl">
            <h2 className='text-lg'>Please Login..!!</h2>

              <label className="input input-bordered flex items-center gap-2 w-full">
                  <FaUser />
                 <input type="text" className="grow" placeholder='username' name='username' onChange={handleInputChange} />
                  
              </label>
              <label className="input input-bordered flex items-center gap-2 w-full">
                  <RiLockPasswordFill/>
                  <input type="password" className="grow"  placeholder='password' name='password' onChange={handleInputChange}/>
                  
              </label>
              <button className="btn btn-primary" onClick={handleLogin}>Login</button>
              <p>
                Don't have an account? &nbsp;<Link to="/signup" className='text-blue-400 underline'>Sign up</Link>
              </p>
          </div>
      </div>
  )
}

export default Login