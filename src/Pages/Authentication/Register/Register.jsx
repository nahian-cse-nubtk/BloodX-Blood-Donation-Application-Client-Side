import axios from "axios";
import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useLocation, useNavigate,Link } from "react-router";
import useAuth from "../../../hooks/useAuth/useAuth";



const Register = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const {createUser,updateUser} =useAuth()
  const { districts, upzillas } = useLoaderData();
  // console.log(districts,upzillas);
  const allDistrictName = districts.map((d) => d.name);
  // console.log(allDistrictName);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const donerDistrict = useWatch({ control, name: "district" });
  const password = useWatch({ control, name: "password" });
  const upzillasByDistrict = (district) => {
    const selectedDistrict = districts.find((d) => d.name === district);
    if (selectedDistrict) {
      const selectedUpzilla = upzillas.filter(
        (u) => u.district_id == selectedDistrict.id
      );
      return selectedUpzilla;
    }
  };
  const handleRegister = (data) => {

     const email = data.email;
     const password = data.password;
     createUser(email,password)
     .then(result=>{
        if(result.user){
     navigate(location.state || '/')
    const profileImage = data.Image[0]
    const formData = new FormData()
    formData.append('image',profileImage)
    const image_api_url =`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGEBB_API_KEY}`

    axios.post(image_api_url,formData)
    .then(res=>{
        const profile ={
            displayName: data.Name,
            photoURL: res.data.data.url
        }
        updateUser(profile)
        .then(()=>{
            const userData ={
                name: data.Name,
                email: data.email,
                Image: res.data.data.url,
                bloodGroup: data.bloodGroup,
                district: data.district,
                upzilla: data.upzilla
            }
        axios.post('http://localhost:4000/users',userData)
        .then(res=>{
            console.log(res.data)
        })
        })

    })
    .catch(error=>{
        console.log(error)
    })

        }
     })


  };

  return (
    <div>
      <div className=" mx-auto my-10 card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <form onSubmit={handleSubmit(handleRegister)}>
            <fieldset className="fieldset">
              <label className="label">Name</label>
              <input
                {...register("Name", { required: true })}
                type="text"
                className="input"
                placeholder="Your name"
              />
              {errors.Name?.type === "required" && (
                <p className="text-red-400">Name is required</p>
              )}

              <label className="label">Email</label>
              <input
                {...register("email", { required: true })}
                type="email"
                className="input"
                placeholder="Email"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-400">Email is required</p>
              )}
              <label className="label">Your Blood Group</label>
              <select
                {...register("bloodGroup", { required: true })}
                defaultValue="Pick A Blood Group"
                className="select select-secondary"
              >
                <option>Pick your blood group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
              {errors.bloodGroup?.type === "required" && (
                <p className="text-red-400">Blood Group is required</p>
              )}
              <label className="label">Your District</label>
              <select
                {...register("district", { required: true })}
                defaultValue="Pick a District"
                className="select"
              >
                <option>Pick your district</option>
                {allDistrictName.map((d) => (
                  <option value={d}>{d}</option>
                ))}
              </select>
              {errors.district?.type === "required" && (
                <p className="text-red-400">District is required</p>
              )}
              <label className="label">Your Upzilla</label>
              <select
                {...register("upzilla", { required: true })}
                defaultValue="Pick a upzilla"
                className="select"
              >
                <option>Pick your Upzilla</option>
                {upzillasByDistrict(donerDistrict) &&
                  upzillasByDistrict(donerDistrict).map((u) => (
                    <option value={u.name}>{u.name}</option>
                  ))}
              </select>
              {errors.upzilla?.type === "required" && (
                <p className="text-red-400">Upzilla is required</p>
              )}
              <label className="label">Password</label>
              <input
                {...register("password", {
                  required: true,
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  },
                })}
                type="password"
                className="input"
                placeholder="Password"
              />
              {errors.password?.type === "pattern" && (
                <p className="text-red-400">
                  Password must contain 8+ chars, uppercase, lowercase, number,
                  special character.
                </p>
              )}
              {errors.password?.type === "required" && (
                <p className="text-red-400">Password must required</p>
              )}

              <label className="label">Confirmed Password</label>
              <input
                {...register("confirmedPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                type="password"
                className="input"
                placeholder="Confirmed Password"
              />
              {errors.confirmedPassword && (
                <p className="text-red-400">
                  {errors.confirmedPassword.message}
                </p>
              )}
              <label className="label">Upload your image</label>
              <input
                {...register("Image",{required: "You must need to upload an image"})}
                type="file"
                className="file-input file-input-ghost"
              />
              {
                errors.Image&& <p className="text-red-400">
                  {errors.Image.message}
                </p>
              }

              <button type="submit" className="btn btn-neutral mt-4">Register</button>
            </fieldset>
          </form>
          <p>Already have an account? <Link to='/login'><span className="text-green-300 underline">Login</span></Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
