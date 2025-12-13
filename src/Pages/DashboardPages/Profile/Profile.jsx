import React, { useEffect } from 'react';
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import useAxiosSecure from './../../../hooks/useAxiosSecure/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth/useAuth';
import { useLoaderData } from 'react-router';
import { toast } from 'react-toastify';
import Loading from '../../../Components/Loading/Loading';
const Profile = () => {
    const axiosSecure = useAxiosSecure()
    const {user} =useAuth()
    const [editMode, setEditMode] = useState(false);
    const { districts, upzillas } = useLoaderData();
      // console.log(districts,upzillas);
      const allDistrictName = districts.map((d) => d.name);
      // console.log(allDistrictName);


    const {data:userData ={},isPending,refetch} = useQuery({
        queryKey: ['user-data',user?.email],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/users/${user?.email}/role`)
            return res.data;
        }
    })

  const { register, handleSubmit,control,reset } = useForm({
    defaultValues: {
      name: userData.name,
      email: userData.email,
      district: userData.district,
      upazila: userData.upzilla,
      blood: userData.bloodGroup,
    },
  });

useEffect(() => {
  if (userData) {
    reset({
      name: userData.name,
      email: userData.email,
      district: userData.district,
      upzilla: userData.upzilla,
      bloodGroup: userData.bloodGroup,
    });
  }
}, [userData, reset]);
 const donerDistrict = useWatch({ control, name: "district" });
  const upzillasByDistrict = (district) => {
    const selectedDistrict = districts.find((d) => d.name === district);
    if (selectedDistrict) {
      const selectedUpzilla = upzillas.filter(
        (u) => u.district_id == selectedDistrict.id
      );
      return selectedUpzilla;
    }
  };
  const handleUpdate = (data) => {
    const updatedData = {
    ...data,
    _id: userData._id,
  };

    axiosSecure.patch('/users',updatedData)
    .then(res=>{
        //console.log(res.data)
        if(res.data.acknowledged){
            refetch()
            toast('Update successful')
            setEditMode(false);
        }
    })

  };
  if(isPending){
    return <Loading></Loading>
  }

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* LEFT CARD */}
      <div className="bg-white/40 backdrop-blur-xl rounded-2xl shadow-lg p-6 flex flex-col items-center shadow-red-100">
        <img
          src={userData.Image}
          className="w-32 h-32 rounded-full border-4 border-white shadow-md"
        />

        <h2 className="text-xl font-semibold mt-4">{userData.name}</h2>
        <p className="text-gray-500 text-sm">{userData.email}</p>

        <div className="mt-4 space-y-2 w-full text-center">
          <p className="font-medium">Blood: <span className="text-red-600 font-bold">{userData.bloodGroup}</span></p>
          <p>District: {userData.district}</p>
          <p>Upzilla: {userData.upzilla}</p>
        </div>


      </div>

      {/* RIGHT FORM CARD */}
      <div className="md:col-span-2 bg-white rounded-2xl shadow-xl p-6 shadow-red-100">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-2xl font-semibold">Profile Information</h3>

          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="btn bg-red-500 text-white btn-md"
            >
              Edit
            </button>
          ) : null}
        </div>

        <form onSubmit={handleSubmit(handleUpdate)} className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* NAME */}
          <div>
            <label className="font-medium">Name</label>
            <input
              {...register("name")}
              disabled={!editMode}
              className="input input-bordered w-full"
            />
          </div>

          {/* EMAIL (ALWAYS DISABLED) */}
          <div>
            <label className="font-medium">Email</label>
            <input
              {...register("email")}
              disabled
              className="input input-bordered w-full bg-gray-100"
            />
          </div>

          {/* DISTRICT */}
          <div>
            <label className="font-medium">District</label>
            <select
              {...register("district")}
              disabled={!editMode}
              className="select select-bordered w-full"
            >
              <option>Change District</option>
              {allDistrictName.map((d) => (
                  <option value={d}>{d}</option>
                ))}
            </select>
          </div>

          {/* UPZILA */}
          <div>
            <label className="font-medium">Upzilla</label>
            <select
              {...register("upzilla")}
              disabled={!editMode}
              className="select select-bordered w-full"
            >
              <option>Change Upzilla</option>
              {upzillasByDistrict(donerDistrict) &&
                  upzillasByDistrict(donerDistrict).map((u) => (
                    <option value={u.name}>{u.name}</option>
                  ))}
            </select>
          </div>

          {/* BLOOD GROUP */}
          <div>
            <label className="font-medium">Blood Group</label>
            <select
              {...register("bloodGroup")}
              disabled={!editMode}
              className="select select-bordered w-full"
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
          </div>

          {editMode && (
            <div className="md:col-span-2 mt-4">
              <button className="btn bg-red-500 text-white w-full">Save Changes</button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
export default Profile;