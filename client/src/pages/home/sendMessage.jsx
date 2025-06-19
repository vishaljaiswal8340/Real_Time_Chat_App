import React from 'react'
import { useState } from 'react';
import { IoIosSend } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { sendMessageThunk } from '../../store/slice/message/messageThunk';


 const SendMessage = () => {
   
  const dispatch = useDispatch();  
  const [message,setMessage] = useState("");

  const {selectedUser} = useSelector(state => state.userReducer);

  const handleSendMessage = () => {
     console.log(message);
   

     dispatch(sendMessageThunk({receiverId:selectedUser?._id,
        message,
     }));
      setMessage("");
   

  }
  return (
   <div className='w-full p-3 flex gap-2'>
              <input
                  type="text"
                  placeholder="Type here..."
                  className="input input-bordered input-primary w-full"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)} 
              />

              <button onClick={handleSendMessage} className="btn btn-square btn-outline btn-primary">
                  <IoIosSend />
              </button>  
    </div>
  )
}

export default SendMessage
