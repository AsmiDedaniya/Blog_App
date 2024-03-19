import { Link, Navigate, useNavigate } from "react-router-dom";
import InputBox from "../components/input.component";
import googleIcon from "../imgs/google.png";
import AnimationWrapper from "../common/page-animation";
import { useContext, useRef } from "react";
import{Toaster,toast} from"react-hot-toast";
import axios from "axios";
import { storeInSession } from "../common/session";
import { UserContext } from "../App";
const UserAuthForm=({type})=>{
    const authForm=useRef();
    let {user,setUser}=useContext(UserContext);
    const navigate = useNavigate();
    if(user.username){
        navigate('/');
    }
    // console.log(access_token);
    // const   userAuthThroughServer=(serverRoute,formData)=>{
    //     console.log( import.meta.env.VITE_SERVER_DOMAIN + serverRoute,formData)
    //       axios.post(import.meta.env.VITE_SERVER_DOMAIN + serverRoute,formData)
    //       .then(({data})=>{ 
    //         // console.log(data);
    //         //for session from session.jsx
    //          storeInSession("user",JSON.stringify(data))
    //          console.log(sessionStorage)
           
           
    //       })
    //       .catch(({response})=>{
    //         toast.error(response.data.error)
    //       })
         
    // }
    const userAuthThroughServer = (serverRoute, formData) => {
        // console.log(import.meta.env.VITE_SERVER_DOMAIN + serverRoute, formData);
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + serverRoute, formData)
            .then(({ data }) => {
                // for session from session.jsx
                console.log("form ",data);
                setUser(data);
                //console.log(sessionStorage);
            })
            .catch((error) => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    toast.error(error.response.data.error);
                    console.error("Server Error Response:", error.response);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.error("No response received:", error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.error("Error setting up request:", error.message);
                }
            });
    };
    
    const handleSubmit=(e)=>{
        e.preventDefault();
//to connect server
let serverRoute=type=="sign-in" ? "/signin" : "/signup";
//
        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password
        //formData
       // let form=new FormData(authForm.current); //add ref to form 
       let form=new FormData(formElement); //add form id 
       // console.log(form);
        let formData={};
        for(let[key,value] of form.entries()){
            formData[key]=value;
        }

       // console.log(formData);
       let{fullname,email,password}=formData;
      if(fullname){
        if (fullname.length < 3) {
            return toast.error( "Fullname must be at least 3 letters long")
        }
      }
    if (!email.length) {
        return toast.error( "Enter Email" )
    }
    if (!emailRegex.test(email)) {
        return toast.error( "Email is invalid")
    }
    if (!passwordRegex.test(password)) {
        return toast.error( "Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letters" )
    }
    //connect to server
    userAuthThroughServer(serverRoute,formData);
    }
    console.log(user._id);
    return(
        user._id?<Navigate to ="/"/>:
        <AnimationWrapper keyvalue={type}>
                <section className="h-cover flex items-center justify-center">
                    <Toaster/>
          <form id="formElement"className="w-[80%] max-w-[400px]">
            <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
                {type=="sign-in" ?"Welcome back":"Join us today"}
            </h1>
            {
                type!= "sign-in"?
                <InputBox
                name="fullname"
                type="text"
                placeholder="Full Name"
                icon="fi-rr-user"/>
                :""
            }
            <InputBox
                name="email"
                type="email"
                placeholder="Email"
                icon="fi-rr-envelope"/>
                <InputBox
                name="password"
                type="password"
                placeholder="Password"
                icon="fi-rr-key"/>

                <button
                className="btn-dark center mt-14"
                type="submit"
                onClick={handleSubmit}>
                    {type.replace("-"," ")}
                    
                </button>
                <div className="relative w-full flex items-center gap-1 my-3 opacity-10 uppercase text-black font-bold">
                    <hr className="w-1/2 border-black"/>
                    <p>or</p>
                    <hr className="w-1/2 border-black"/>

                </div>
                <button className="btn-dark flex items-center justify-center gap-4 w-[90%] center ">
                    <img src={googleIcon} className="w-5"/>
                    continue with google
                </button>
                {
                    type=="sign-in"?
                    <p className="mt-6 text-dark-grey text-xl text-center">
                       Don't have an account?
                       <Link to="/signup" className="underline text-black text-xl ml-1">
                        Join us today.
                       </Link>
                    </p>
                    :
                    <p className="mt-6 text-dark-grey text-xl text-center">
                       Already a member?
                       <Link to="/signin" className="underline text-black text-xl ml-1">
                        Sign in here.
                       </Link>
                    </p>

                }

          </form>
                </section>
        </AnimationWrapper>
    )
}

export default UserAuthForm;