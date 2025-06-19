import { createSlice } from '@reduxjs/toolkit'

import { loginUserThunk,registerUserThunk,logoutUserThunk,getUserProfileThunk,getOtherUserThunk } from './userThunk';


const initialState={
  isAuthenticated:false,
  screenLoading:true,
  userProfile:null,
  buttonLoading:false,
  otherUsers:null,
  selectedUser:localStorage.getItem("selectedUser")?JSON.parse(localStorage.getItem("selectedUser")):null,
 
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
   
    setSelectedUser:(state,action)=>{    
      localStorage.setItem("selectedUser",JSON.stringify(action.payload));  
      state.selectedUser=action.payload;
    }

  },
  extraReducers: (builder) => {
   //login user
    builder.addCase(loginUserThunk.pending, (state, action) => {
      console.log("pending");
      state.buttonLoading=true;

    });
     builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      console.log("fulfilled");
      console.log(action.payload);
      
      state.userProfile=action.payload?.responseData?.user;
      state.isAuthenticated=true;
       state.buttonLoading=false;
    });
     builder.addCase(loginUserThunk.rejected, (state, action) => {
      console.log("rejected");
      state.buttonLoading=false;
    });
     
    //register user
     builder.addCase(registerUserThunk.pending, (state, action) => {
      console.log("pending");
      state.buttonLoading=true;

    });
     builder.addCase(registerUserThunk.fulfilled, (state, action) => {
      console.log("fulfilled");
      state.userProfile=action.payload?.responseData?.user;
      state.isAuthenticated=true;
       state.buttonLoading=false;
    });
     builder.addCase(registerUserThunk.rejected, (state, action) => {
      console.log("rejected");
      state.buttonLoading=false;
    });

    // //logout user
     builder.addCase(logoutUserThunk.pending, (state, action) => {
      console.log("pending");
      state.buttonLoading=true;

    });
     builder.addCase(logoutUserThunk.fulfilled, (state, action) => {
     state.isAuthenticated=false;
      state.userProfile=null;
      state.selectedUser=null;
       state.otherUsers=null;
       state.buttonLoading=false;
       localStorage.clear();
    });
     builder.addCase(logoutUserThunk.rejected, (state, action) => {
      console.log("rejected");
      state.buttonLoading=false;
    });

    //getUserProfile
     builder.addCase(getUserProfileThunk.pending, (state, action) => {
      console.log("pending");
      // state.screenLoading=true;

    });
     builder.addCase(getUserProfileThunk.fulfilled, (state, action) => {
     state.isAuthenticated=true;
     
       state.screenLoading=false;
       console.log(action.payload);
       state.userProfile=action.payload?.responseData;

    });
     builder.addCase(getUserProfileThunk.rejected, (state, action) => {
      console.log("rejected");
      state.screenLoading=false;
    });


    //getotheruser
     builder.addCase(getOtherUserThunk.pending, (state, action) => {
      console.log("pending");
      state.screenLoading=true;

    });
     builder.addCase(getOtherUserThunk.fulfilled, (state, action) => {
    
     
       state.screenLoading=false;
       console.log(action.payload);
       state.otherUsers=action.payload?.responseData;

    });
     builder.addCase(getOtherUserThunk.rejected, (state, action) => {
      console.log("rejected");
      state.screenLoading=false;
    });
  },
  
})

// Action creators are generated for each case reducer function

 export const {setSelectedUser} = userSlice.actions;

export default userSlice.reducer