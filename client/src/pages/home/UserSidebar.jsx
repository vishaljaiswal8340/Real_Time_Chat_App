import React, { use } from 'react'
import { useState } from 'react';
import User from './User';
import { FaSearch } from "react-icons/fa";

import { useDispatch } from 'react-redux';
import { logoutUserThunk } from '../../store/slice/user/userThunk';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getOtherUserThunk } from '../../store/slice/user/userThunk';


const UserSidebar = () => {

  const [searchValue, setSearchValue] = useState("");
  const [users, setUsers] = useState([]);

  const dispatch = useDispatch();
  const { otherUsers, userProfile } = useSelector(state => state.userReducer);

  // console.log(otherUsers);

  const handleLogout = async () => {

    await dispatch(logoutUserThunk())

  }
  
  useEffect(() => {
    if(!searchValue) {
      setUsers(otherUsers);
     
    }else{
      setUsers(otherUsers.filter(user=>{
        return user.username.toLowerCase().includes(searchValue.toLowerCase()) || user.fullName.toLowerCase().includes(searchValue.toLowerCase())
      }));


      
    }

  }, [searchValue,otherUsers]);


  useEffect(() => {
    dispatch(getOtherUserThunk());

  }, []);


  return (

    <div className='max-w-[20rem] w-full h-screen  flex flex-col border-r border-r-white/10'>
      <h1 className='bg-black  mx-3 mt-3 px-2 py-1 text-[#605DFF] text-xl font-semibold rounded-lg'>GUP SHUP</h1>

      <div className='p-3'>
        <label className="input input-bordered flex items-center gap-2">
          <input onChange={(e)=>setSearchValue(e.target.value)} type="text" className="grow" placeholder="Search" />
          <FaSearch />
        </label>
      </div>

      <div className='h-full overflow-y-auto px-3 flex flex-col gap-2'>

        {users?.map((userDetails) => (
          <User key={userDetails?._id} userDetails={userDetails} />
        ))}


      </div>

      <div className='flex items-center justify-between p-3'>
        <div className='flex items-center gap-2'>
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
              <img src={userProfile?.avatar} />

            </div>

          </div>
          <h2>{userProfile?.username}</h2>

        </div>

        <button className="btn btn-primary btn-sm px-4" onClick={handleLogout}>Logout</button>


      </div>

    </div>
  )
}

export default UserSidebar