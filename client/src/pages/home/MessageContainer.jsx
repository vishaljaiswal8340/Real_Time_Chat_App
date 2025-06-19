import React, { useEffect } from 'react'
import User from './User';
import Message from './Message';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getMessageThunk } from '../../store/slice/message/messageThunk';
import SendMessage from './sendMessage';

const MessageContainer = () => {
   const dispatch = useDispatch();
    const {selectedUser} = useSelector(state => state.userReducer);

    const {messages} = useSelector(state => state.messageReducer);
   

    useEffect(() => {
      if(selectedUser?._id){
         dispatch(getMessageThunk({receiverId:selectedUser?._id}));     
      }
    }, [selectedUser])


      
     
  return (
    <>
      {!selectedUser ? (
        <div className='flex items-center justify-center flex-col gap-5 w-full'>
          <h2>Welcome to GUP SHUP</h2>
          <p className='text-xl'> please select a person to continue your chat!! </p>
       
        </div>
      ) : (<div className='w-full h-screen flex flex-col'>
        <div className='p-3  border-b border-b-white/10'>
          <User userDetails={selectedUser} />
        </div>

        <div className='h-full overflow-y-auto p-3' >
          {messages?.map((message) => (
            <Message key={message?._id} messageDetails={message} />
          ))}

        </div>

        <SendMessage />


      </div>
      )}


    </>

  );
};


export default MessageContainer