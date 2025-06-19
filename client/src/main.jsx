import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// import { BrowserRouter} from "react-router-dom";

//or
import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom';
import Home from './pages/home/Home.jsx';
import Login from './pages/authentication/Login.jsx';
import Signup from './pages/authentication/Signup.jsx';

import ProtectedRoute from './components/ProtectedRoute.jsx';

const router = createBrowserRouter(
  [
    {
      path: "/",
      element:(
        //we cannot go home if we are not login-add this functionality
        //so we need to wrap home component with protected route
       <ProtectedRoute>
        <Home />
       </ProtectedRoute>
      )
      
    },
    {
      path: "/login",
      element: <Login/>,
    },
    {
      path: "/signup",
      element: <Signup/>,
    },
  ],
);

import { store } from './store/store.js';
import { Provider } from 'react-redux';



createRoot(document.getElementById('root')).render(
  // <BrowserRouter>
  //   <App />
  // </BrowserRouter>
 
 //or
  <Provider store={store}>
    <App />
    <RouterProvider router={router} />
    
   
  </Provider>
);
