import React from 'react';

import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUserThunk } from '../../store/slice/user/userThunk';
import toast from 'react-hot-toast';

const Signup = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
     const {isAuthenticated} = useSelector(state => state.userReducer);
    
    useEffect(() => {
        if(isAuthenticated) navigate('/');
     }, [isAuthenticated]);

    const [signupData,setSignupData]=useState({
            fullName:"",
            username:"",
            password:"",
            confirmPassword:"",
            gender:"male"
        })
        const handleInputChange=(event)=>{
            setSignupData({...signupData,[event.target.name]:event.target.value})
        }
        
        const handleSignup=async()=>{
            if(signupData.password!==signupData.confirmPassword){
               return  toast.error("Passwords and confirmpassword do not match");
            }
           const response=await dispatch(registerUserThunk(signupData));
           console.log(response);
           
           if(response?.payload?.success){
            navigate('/');

           }
            
        }
       
  return (
      <div className='flex justify-center items-center p-6 min-h-screen'>
          <div className="max-w-[40rem] w-full flex flex-col gap-5 bg-base-200 p-6 rounded-3xl">
            <h2 className='text-lg'>Please Signup..!!</h2>

            <label className="input input-bordered flex items-center gap-2 w-full">
                  <FaUser />
                 <input type="text" className="grow" placeholder='Full Name' name='fullName' onChange={handleInputChange}/>
                  
              </label>

              <label className="input input-bordered flex items-center gap-2 w-full">
                  <FaUser />
                 <input type="text" className="grow" placeholder='Username' name="username" onChange={handleInputChange} />
                  
              </label>

              <label className="input input-bordered flex items-center gap-2 w-full">
                  <RiLockPasswordFill/>
                  <input type="password" className="grow"  placeholder='password' name="password" onChange={handleInputChange}/>
                  
              </label>

              <label className="input input-bordered flex items-center gap-2 w-full">
                  <RiLockPasswordFill/>
                  <input type="password" className="grow"  placeholder='Confirm password' name="confirmPassword" onChange={handleInputChange}/>
                  
              </label>

              <div className="flex items-center gap-5">
                  <label htmlFor='male' className='flex gap-3 items-center'>
                      <input id="male" type="radio" name="gender"
                          value="male"
                          className="radio radio-primary" onChange={handleInputChange} />
                      male
                  </label>
                  <label htmlFor='female' className='flex gap-3 items-center'>
                      <input id="female" type="radio" name="gender" value="female" className="radio radio-primary" onChange={handleInputChange}/>
                      female
                  </label>
              </div>
            
             

              <button className="btn btn-primary" onClick={handleSignup}>Signup</button>

              <p>
                Already have an account? &nbsp;<Link to="/login" className='text-blue-400 underline'>Login</Link>
              </p>

          </div>
      </div>
  )
}

export default Signup