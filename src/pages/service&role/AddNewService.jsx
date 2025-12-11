// File: AddNewService.jsx (Consistent with RHF Usage)
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form"; // Import useForm
import {
  HiCollection,
  HiSave,
  HiCurrencyDollar,
  HiTag,
  HiScale,
  HiPencil,
  HiSparkles,
  HiPhotograph,
  HiMail,
  HiClock,
} from "react-icons/hi";
import useAxiosInstance from "../../hooks and contexts/axios/useAxiosInstance";
import { useAuth } from "../../hooks and contexts/auth/useAuth";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { BiLeftArrowCircle } from "react-icons/bi";

export default function AddNewService() {
  const { user } = useAuth();
  const serviceCategories = ["Wedding", "Home", "Office", "Seminar", "Meeting"];
  const unitOptions = [
    "Per Sq-Ft",
    "Per Meter",
    "Per Room",
    "Per Floor",
    "Per Event",
    "Per Package",
    "Per Item",
  ];

  const axiosInstance = useAxiosInstance();

  // --- React Hook Form Setup ---
  const { register, handleSubmit, reset } = useForm();
  const cloudName = import.meta.env.VITE_cloudinary_cloud;
  const preset = import.meta.env.VITE_preset;

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("file", data.photo[0]);
    formData.append("upload_preset", preset);

    try {
      const uploadData = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );

      const url = uploadData.data.secure_url;

      console.log(url);

      const serviceData = {
        ...data,
        createdByEmail: user?.email,
        createdByName: user?.displayName,
        createdAt: new Date(),
        cost: parseFloat(data.cost),
        photo: url,
      };

      const insertResult = await axiosInstance.post("/services", serviceData);
      console.log(insertResult.data);
      reset();

      await Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Service added to database",
        showConfirmButton: false,
        timer: 1500,
      });

      console.log("Final Service Data:", serviceData);
    } catch (error) {
      console.log("submission failed", error);
    }
  };

  return (
    <div className="p-4 bg-linear-to-br from-gray-200 via-emerald-100 to-gray-200 sm:p-6 lg:p-8 w-full">
      {/* Page Header */}
      <header className="mb-8  border-b border-neutral-dark pb-4">
        <h2 className="text-3xl font-semibold text-text-primary flex items-center gap-3">
          <HiCollection className="w-8 h-8 text-primary" />
          Create New Service Package
        </h2>
        <p className="text-text-muted mt-1">
          Enter the details required to offer a new decoration service to your
          clients.
        </p>
      </header>

      {/* Main form container */}
      <div className="max-w-4xl mx-auto bg-[#FFFFF0] p-6 rounded-xl shadow-lg border border-neutral">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* SECTION 1  */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/*  Service name */}
            <div className="md:col-span-4">
              <label
                htmlFor="serviceName"
                className="block text-sm font-medium text-text-secondary mb-1"
              >
                Service Name
              </label>
              <div className="relative">
                <HiSparkles className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-dark" />
                <input
                  id="serviceName"
                  type="text"
                  placeholder="e.g., Premium Wedding Stage Decor"
                  {...register("serviceName", { required: true })}
                  className="w-full pl-10 pr-4 py-2.5 bg-bg-main border border-neutral-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-150 text-sm"
                />
              </div>
            </div>

            {/*---------------------cost---------------- */}
            <div className="md:col-span-2">
              <label
                htmlFor="cost"
                className="block text-sm font-medium text-text-secondary mb-1"
              >
                Cost (BDT)
              </label>
              <div className="relative">
                <HiCurrencyDollar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-dark" />
                <input
                  id="cost"
                  type="number"
                  placeholder="50000"
                  {...register("cost", { required: true, valueAsNumber: true })}
                  className="w-full pl-10 pr-4 py-2.5 bg-bg-main border border-neutral-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-150 text-sm"
                />
              </div>
            </div>

            {/* ----------------------rate type -----------------*/}

            <div className="md:col-span-2">
              <label
                htmlFor="rateType"
                className="block text-sm font-medium text-text-secondary mb-1"
              >
                Rate type
              </label>
              <div className="relative">
                <HiCurrencyDollar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-dark pointer-events-none" />
                <select
                  id="rateType"
                  {...register("rateType", { required: true })}
                  className="w-full pl-10 pr-4 py-2.5 bg-bg-main border border-neutral-dark rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-150 text-sm"
                >
                  <option value="" selected disabled>
                    Select Model
                  </option>
                  <option value="rate-per-unit">Rate Per Unit</option>
                  <option value="flat-rate">Flat Rate</option>
                </select>
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-neutral-dark">
                  ▼
                </span>
              </div>
            </div>

            {/* --------------------unit-------------------- */}
            <div className="md:col-span-2">
              <label
                htmlFor="unit"
                className="block text-sm font-medium text-text-secondary mb-1"
              >
                Unit
              </label>
              <div className="relative">
                <HiScale className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-dark pointer-events-none" />
                <select
                  id="unit"
                  {...register("unit", { required: true })}
                  className="w-full pl-10 pr-4 py-2.5 bg-bg-main border border-neutral-dark rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-150 text-sm"
                >
                  <option value="" selected disabled>
                    Select Unit
                  </option>
                  {unitOptions.map((option) => (
                    <option
                      key={option}
                      value={option.toLowerCase().replace(/[\/\s]/g, "-")}
                    >
                      {option}
                    </option>
                  ))}
                </select>
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-neutral-dark">
                  ▼
                </span>
              </div>
            </div>

            {/* ---------------------category------------------------- */}
            <div className="md:col-span-4">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-text-secondary mb-1"
              >
                Service Category
              </label>
              <div className="relative">
                <HiTag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-dark pointer-events-none" />
                <select
                  id="category"
                  {...register("category", { required: true })}
                  className="w-full pl-10 pr-4 py-2.5 bg-bg-main border border-neutral-dark rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-150 text-sm"
                >
                  <option value="" selected disabled>
                    Select Category
                  </option>
                  {serviceCategories.map((option) => (
                    <option
                      key={option}
                      value={option.toLowerCase().replace(/ /g, "-")}
                    >
                      {option}
                    </option>
                  ))}
                </select>
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-neutral-dark">
                  ▼
                </span>
              </div>
            </div>
          </div>

          {/* SECTION 2 */}
          <div className="border-t border-neutral pt-6 space-y-6">
            {/*------------------short description ---------------------*/}
            <div>
              <label
                htmlFor="shortDescription"
                className="block text-sm font-medium text-text-secondary mb-1"
              >
                Short Description (For Service Cards)
              </label>
              <div className="relative">
                <HiPencil className="absolute left-3 top-3 w-5 h-5 text-neutral-dark" />
                <textarea
                  id="shortDescription"
                  rows="3"
                  placeholder="A brief, engaging summary (max 250 characters) for the Home/Services page cards."
                  {...register("shortDescription", {
                    required: true,
                    maxLength: 250,
                  })}
                  className="w-full pl-10 pr-4 py-2.5 bg-bg-main border border-neutral-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-150 text-sm resize-none"
                />
              </div>
            </div>

            {/* ------------------long description ----------------------*/}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-text-secondary mb-1"
              >
                Detailed Description (For Details Page)
              </label>
              <div className="relative">
                <HiPencil className="absolute left-3 top-3 w-5 h-5 text-neutral-dark" />
                <textarea
                  id="description"
                  rows="5"
                  placeholder="Describe the inclusions, materials, and scope of this package..."
                  {...register("description", { required: true })}
                  className="w-full pl-10 pr-4 py-2.5 bg-bg-main border border-neutral-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-150 text-sm resize-none"
                />
              </div>
            </div>

            {/*-----------------------------Image URL -----------------------*/}
            <div className="w-full">
              <label
                htmlFor="photoURL"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Photo (Optional)
              </label>
              <div className="relative">
                <input
                  id="photoURL"
                  {...register("photo")}
                  type="file"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                 file:rounded-lg file:border file:border-neutral file:text-sm
                 file:bg-white file:text-gray-700
                 hover:file:bg-primary hover:file:text-white
                 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
                 transition-all duration-300"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-neutral pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* -----------------action field---------------- */}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full sm:w-auto flex items-center gap-2 px-8 py-3 text-base font-medium rounded-lg shadow-md text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-4 focus:ring-accent-light transition-all duration-200"
            >
              <HiSave className="w-5 h-5" />
              Save New Service
            </button>
          </div>
          <div className="">
            <Link
              className="flex items-center justify-start gap-2 px-3 hover:text-accent-hover"
              to="/dashboard"
            >
              <BiLeftArrowCircle size={22}></BiLeftArrowCircle> back to
              dashboard
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
