import React, { useState } from 'react';
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";
import useAxiosSecure from '../../../hooks/useAxiosSecure/useAxiosSecure';

import DonorCard from '../../../Components/DonorCard/DonorCard';
import { useQuery } from '@tanstack/react-query';
const SearchDonor = () =>{
    const axiosSecure =useAxiosSecure()
    const [searchText, setSearchText] = useState(null)

  const { districts, upzillas } = useLoaderData();


  const allDistrictName = districts.map((d) => d.name);

  const { register, handleSubmit, control } = useForm()

  const selectedDistrict = useWatch({ control, name: "district" });


  const upazilaByDistrict = (district) => {
    const found = districts.find((d) => d.name === district);
    if (!found) return [];

    return upzillas.filter((u) => u.district_id === found.id);
  };
  const {}=useQuery({
    queryKey:['donor',searchText],
    queryFn: async()=>{
        const res = await axiosSecure.get(``)
    }
  })
  const onSubmit = (data) => {
   setSearchText(data)

  };


  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto bg-white/60 backdrop-blur-xl shadow-xl rounded-2xl p-8 border border-red-50">

        {/* TITLE */}
        <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">
          Search Donor
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Recipient District */}
          <div>
            <label className="font-semibold mb-1 block">Select District</label>
            <select
              {...register("district", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select District</option>
              {allDistrictName.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Recipient Upazila */}
          <div>
            <label className="font-semibold mb-1 block">Select Upazila</label>
            <select
              {...register("upazila", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select Upazila</option>
              {selectedDistrict &&
                upazilaByDistrict(selectedDistrict).map((u) => (
                  <option key={u.name} value={u.name}>
                    {u.name}
                  </option>
                ))}
            </select>
          </div>
          {/* Blood Group */}
          <div>
            <label className="font-semibold mb-1 block">Select Blood Group</label>
            <select {...register("bloodGroup")} className="select select-bordered w-full">
              <option value="">Select Blood Group</option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
              <option>O+</option>
              <option>O-</option>
            </select>
          </div>

          {/* BUTTON */}
          <div className="col-span-2 mt-4">
            <button className="btn w-full bg-red-600 hover:bg-red-700 text-white text-lg">
              Search
            </button>
          </div>

        </form>
      </div>
      <div>
        {/* <DonorCard></DonorCard> */}
      </div>
    </div>
  );
}


export default SearchDonor;