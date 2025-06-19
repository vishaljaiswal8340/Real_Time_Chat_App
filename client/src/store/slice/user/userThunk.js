//here we are doing api related work
import {createAsyncThunk} from "@reduxjs/toolkit";
import { toast } from'react-hot-toast';


import { axiosInstance } from "../../../components/utilities/axiosInstance";

//(name of thunk,callbackfxn)
export const loginUserThunk= createAsyncThunk('user/login',async({username,password},{rejectWithValue}) => {
    try{
      const response=await axiosInstance.post('/user/login',{username,password});
       console.log(response);
       toast.success("Login successfull!");
      return response.data;

    }catch(err){
      console.error(err?.response?.data?.errMessage);
      const errorOutput=err?.response?.data?.errMessage;
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);

export const registerUserThunk= createAsyncThunk('users/signup',async({fullName,username,password,gender},{rejectWithValue}) => {
    try{
      const response=await axiosInstance.post('/user/register',{fullName,username,password,gender});
       console.log(response);
        toast.success("Account created successfully!");
      return response.data;

    }catch(err){
      console.error(err?.response?.data?.errMessage);
      const errorOutput=err?.response?.data?.errMessage;
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);

 export const logoutUserThunk= createAsyncThunk('users/logout',async(_,{rejectWithValue}) => {
    try{
      const response=await axiosInstance.post('/user/logout');
      
        toast.success("Logout successfull!");
      return response.data;

    }catch(err){
      console.error(err?.response?.data?.errMessage);
      const errorOutput=err?.response?.data?.errMessage;
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);


export const getUserProfileThunk= createAsyncThunk('users/getProfile',async(_,{rejectWithValue}) => {
    try{
      const response=await axiosInstance.get('/user/getprofile');
      
      return response.data;

    }catch(err){
      console.error(err?.response?.data?.errMessage);
      const errorOutput=err?.response?.data?.errMessage;
      
      return rejectWithValue(errorOutput);
    }
  }
);


export const getOtherUserThunk= createAsyncThunk('users/getOtherUsers',async(_,{rejectWithValue}) => {
    try{
      const response=await axiosInstance.get('/user/getotherusers');
      
      return response.data;

    }catch(err){
      console.error(err?.response?.data?.errMessage);
      const errorOutput=err?.response?.data?.errMessage;
      
      return rejectWithValue(errorOutput);
    }
  }
);
