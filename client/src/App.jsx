
import './App.css'
import {Toaster} from "react-hot-toast";
import { getUserProfileThunk,getOtherUserThunk } from './store/slice/user/userThunk';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
function App() {
    
 const dispatch = useDispatch();
   
  useEffect(() => {
    dispatch(getUserProfileThunk());
    
  }, []);

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      /> 
      
    </>
  )
}

export default App
