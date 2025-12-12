import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth/useAuth";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";

const Login = () => {
    const {signInUser}=useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const [error, setError] = useState('')
    const {register,handleSubmit,formState: {errors}}=useForm()
    const handleLogin =(data)=>{
        signInUser(data.email,data.password)
        .then(result=>{
            if(result.user){
                toast("Login successful")
                navigate(location.state || '/')
            }
        })
        .catch(error=>
            setError(error)
        )

    }
  return (
    <div>
      <h1 className="text-6xl font-bold text-red-400 text-center my-10">Welcome Back <br /><span className="text-4xl">Login Now!</span></h1>
      <div className="card mx-auto bg-base-100 w-full max-w-sm shrink-0 shadow-2xl shadow-red-100">
        <div className="card-body">
         <form onSubmit={handleSubmit(handleLogin)}>
             <fieldset className="fieldset">
            <label className="label">Email</label>
            <input {...register('email',{required: true})} type="email" className="input" placeholder="Email" />
            {
                errors.email?.type==='required'&& <p className="text-red-400">Email must requird for login</p>
            }
            <label className="label">Password</label>
            <input {...register('password',{required: true})} type="password" className="input" placeholder="Password" />
            {
                errors.password?.type==='required'&& <p className="text-red-400">Password must requird for login</p>
            }
            <div>
              {
                error&& <p className="text-red-400">Invalid email and password</p>
              }
            </div>
            <button type="submit" className="btn bg-red-600 text-white mt-4">Login</button>
          </fieldset>
         </form>
         <p>Don't have an account? <Link to='/authLayout/register'><span className="text-red-400 underline">Register</span></Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
