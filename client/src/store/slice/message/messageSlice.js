import { createSlice } from '@reduxjs/toolkit'


import { sendMessageThunk,getMessageThunk } from './messageThunk';


const initialState={
  buttonLoading:false,
  messages:null,
  screenLoading:false,
 
}

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setNewMessage: (state, action) => {
      // This reducer can be used to set a new message directly
      const oldMessages=state.messages?? [];
      state.messages = [...oldMessages,action.payload];
    }
  },
  extraReducers: (builder) => {
   //send message
    builder.addCase(sendMessageThunk.pending, (state, action) => {
      console.log("pending");
      state.buttonLoading=true;

    });
    builder.addCase(sendMessageThunk.fulfilled, (state, action) => {
      console.log("fulfilled");

      

      
       state.messages.push(action.payload?.responseData);
      
    
       state.buttonLoading=false;
    });
     builder.addCase(sendMessageThunk.rejected, (state, action) => {
      console.log("rejected");
      state.buttonLoading=false;
    });


     //get  messages
    builder.addCase(getMessageThunk.pending, (state, action) => {
      console.log("pending");
      state.buttonLoading=true;

    });
     builder.addCase(getMessageThunk.fulfilled, (state, action) => {
      console.log("fulfilled");
      console.log()
     
      state.messages=action.payload?.responseData?.messages;
      
     
       state.buttonLoading=false;
    });
     builder.addCase(getMessageThunk.rejected, (state, action) => {
      console.log("rejected");
      state.buttonLoading=false;
    });
     
}
});

// Action creators are generated for each case reducer function

 export const {setNewMessage} = messageSlice.actions;

export default messageSlice.reducer