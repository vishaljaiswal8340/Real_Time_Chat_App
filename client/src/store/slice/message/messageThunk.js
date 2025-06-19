//here we are doing api related work
import {createAsyncThunk} from "@reduxjs/toolkit";
import { toast } from'react-hot-toast';


import { axiosInstance } from "../../../components/utilities/axiosInstance";

//(name of thunk,callbackfxn)
export const sendMessageThunk= createAsyncThunk('message/send',async({receiverId,message},{rejectWithValue}) => {
    try{
      const response=await axiosInstance.post(`/message/send/${receiverId}`,{message});

       console.log(response);
      
      return response.data;

    }catch(err){
      console.error(err?.response?.data?.errMessage);
      const errorOutput=err?.response?.data?.errMessage;
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);


export const getMessageThunk= createAsyncThunk('message/get',async({receiverId},{rejectWithValue}) => {
    try{
      const response=await axiosInstance.get(`/message/getmessages/${receiverId}`);

       console.log(response);
      
      return response.data;

    }catch(err){
      console.error(err?.response?.data?.errMessage);
      const errorOutput=err?.response?.data?.errMessage;
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);

