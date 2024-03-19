import Navbar from "./components/navbar.component";
import { Routes,Route } from "react-router-dom";
import UserAuthForm from "./pages/userAuthForm.page";
import { createContext, useEffect, useState } from "react";
import { lookInSession } from "./common/session";
import AddBlog from "./components/AddBlog";
import axios from "axios";
export const UserContext=createContext({});
import Home from "./pages/home.page";
const App = () => {
    const[user,setUser]=useState({});
    const fetchProfile = async()=>{
      const userData = await axios.get(import.meta.env.VITE_SERVER_DOMAIN+'/profile');
      setUser(userData.data);
    }
    useEffect(()=>{
      fetchProfile();
    },[])
    axios.defaults.withCredentials = true;
    return (
       <UserContext.Provider value={{user,setUser}}>
        <Navbar/>
         <Routes>
           <Route path="/" element={<Home/>}/>
           <Route path="signin" element={<UserAuthForm type="sign-in"/>}/>
           <Route path="signup" element={<UserAuthForm type="sign-up"/>}/>
           <Route path="blog/add" element={<AddBlog></AddBlog>}/>
        </Routes>
       </UserContext.Provider>
    )
}

export default App;