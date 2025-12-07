import React from 'react';
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../../hooks/useAuth/useAuth";
import { useLoaderData } from "react-router";
import useRole from '../../../hooks/useRole/useRole';
import useAxiosSecure from '../../../hooks/useAxiosSecure/useAxiosSecure';
import { toast } from 'react-toastify';
const CreateDonataionRequest = () =>{
    const axiosSecure =useAxiosSecure()
    const{userInfo}=useRole()
  const { user } = useAuth();
  const { districts, upzillas } = useLoaderData();


  const allDistrictName = districts.map((d) => d.name);

  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      requesterName: user?.displayName,
      requesterEmail: user?.email,
    },
  });

  const selectedDistrict = useWatch({ control, name: "recipientDistrict" });


  const upazilaByDistrict = (district) => {
    const found = districts.find((d) => d.name === district);
    if (!found) return [];

    return upzillas.filter((u) => u.district_id === found.id);
  };

  const onSubmit = (data) => {
    const finalData = {
      ...data,
      donationStatus: "pending",
    };

    axiosSecure.post('/donationRequests',finalData)
    .then(res=>{
        if(res.data.insertedId){
            toast('Donation Request is being processed')
            reset();
        }
    })

  };
 if (userInfo.status === "Blocked") {
  return (
    <div className="p-8 bg-red-50 border border-red-200 rounded-xl text-center">
      <h2 className="text-2xl font-bold text-red-600">Account Blocked</h2>
      <p className="mt-2 text-gray-700">
        You are blocked by the admin. You cannot create any donation request.
      </p>
    </div>
  );
}
else{
  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto bg-white/60 backdrop-blur-xl shadow-xl rounded-2xl p-8 border border-red-50">

        {/* TITLE */}
        <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">
          Create Donation Request
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">


          <div className="col-span-2 md:col-span-1">
            <label className="block font-semibold mb-1">Requester Name</label>
            <input
              {...register("requesterName")}
              readOnly
              className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
            />
          </div>


          <div className="col-span-2 md:col-span-1">
            <label className="block font-semibold mb-1">Requester Email</label>
            <input
              {...register("requesterEmail")}
              readOnly
              className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Recipient Name */}
          <div>
            <label className="font-semibold mb-1 block">Recipient Name</label>
            <input
              {...register("recipientName", { required: true })}
              className="input input-bordered w-full"
              placeholder="Recipient Full Name"
            />
          </div>

          {/* Recipient District */}
          <div>
            <label className="font-semibold mb-1 block">Recipient District</label>
            <select
              {...register("recipientDistrict", { required: true })}
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
            <label className="font-semibold mb-1 block">Recipient Upazila</label>
            <select
              {...register("recipientUpazila", { required: true })}
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

          {/* Hospital Name */}
          <div>
            <label className="font-semibold mb-1 block">Hospital Name</label>
            <input
              {...register("hospitalName", { required: true })}
              className="input input-bordered w-full"
              placeholder="Ex: Dhaka Medical College Hospital"
            />
          </div>

          {/* Full Address */}
          <div className="col-span-2">
            <label className="font-semibold mb-1 block">Full Address</label>
            <input
              {...register("fullAddress", { required: true })}
              className="input input-bordered w-full"
              placeholder="Ex: Zahir Raihan Rd, Dhaka"
            />
          </div>

          {/* Blood Group */}
          <div>
            <label className="font-semibold mb-1 block">Blood Group</label>
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

          {/* Donation Date */}
          <div>
            <label className="font-semibold mb-1 block">Donation Date</label>
            <input
              type="date"
              {...register("donationDate")}
              className="input input-bordered w-full"
            />
          </div>

          {/* Donation Time */}
          <div>
            <label className="font-semibold mb-1 block">Donation Time</label>
            <input
              type="time"
              {...register("donationTime")}
              className="input input-bordered w-full"
            />
          </div>

          {/* Request Message */}
          <div className="col-span-2">
            <label className="font-semibold mb-1 block">Request Message</label>
            <textarea
              {...register("requestMessage", { required: true })}
              className="textarea textarea-bordered w-full h-32"
              placeholder="Explain why you need blood..."
            ></textarea>
          </div>

          {/* BUTTON */}
          <div className="col-span-2 mt-4">
            <button className="btn w-full bg-red-600 hover:bg-red-700 text-white text-lg">
              Request Donation
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
};

export default CreateDonataionRequest;