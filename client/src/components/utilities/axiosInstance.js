import axios from "axios"; 

const DB_URL = import.meta.env.VITE_DB_URL;

console.log(DB_URL);

export const axiosInstance = axios.create({
  baseURL : DB_URL,//http://localhost:5000/api/v1
  withCredentials: true,  // Enables sending cookies (like JWT stored in HttpOnly cookies) across domains.
  headers: {
//  Authorization: `<Your Auth Token>`,
    ContentType: "application/json",
    
  }, 
  // .. other options
});

