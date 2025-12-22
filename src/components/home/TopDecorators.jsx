import React from "react";
import useAxiosInstance from "../../hooks and contexts/axios/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import { LoadingBubbles } from "../../LoadingAnimations";
import NoData from "../NoData";
import {
  HiLocationMarker,
  HiStar,
  HiCheckCircle,
  HiBriefcase,
} from "react-icons/hi";

const TopDecorators = () => {
  const axiosInstance = useAxiosInstance();

  const { data: decorators, isLoading } = useQuery({
    queryKey: ["top-decorators"],
    queryFn: async () => {
      const res = await axiosInstance.get("/top-decorators");
      return res.data;
    },
  });

  if (isLoading) return <LoadingBubbles></LoadingBubbles>;
  if (!decorators || decorators.length === 0) return <NoData></NoData>;

  return (
    <section className="w-[90dvw] mx-auto py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          Top Decorators
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Meet our most experienced and trusted decoration professionals
        </p>
      </div>

      {/* card section------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {decorators.map((decorator) => (
          <div
            key={decorator._id}
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-neutral"
          >
            <div className="relative h-48 bg-secondary">
              <img
                src={decorator.photoUrl}
                alt={decorator.decoratorName}
                className="w-full h-full object-cover"
              />

              <div className="absolute top-3 right-3 px-3 py-1 bg-primary text-white rounded-full text-xs font-semibold shadow-lg flex items-center gap-1">
                <HiCheckCircle className="w-4 h-4" />
                {decorator.completedCount} Projects
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {decorator.decoratorName}
              </h3>

              <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                <HiLocationMarker className="w-4 h-4 text-primary" />
                <span>{decorator.serviceLocation.city}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                <HiBriefcase className="w-4 h-4 text-accent" />
                <span>{decorator.experienceYears || 0.5} years experience</span>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <HiStar className="w-5 h-5 text-accent" />
                <span className="font-semibold text-gray-800">
                  <span className="text-accent">
                    {" "}
                    {decorator.ratingAverage || 4.5}{" "}
                  </span>
                  {decorator.experienceYears <= 0 && "Junior"}
                </span>
                <span className="font-semibold text-gray-800">
                  {decorator.experienceYears < 3 && "Rising Star"}
                </span>
                <span className="font-semibold text-gray-800">
                  {decorator.experienceYears >= 5 && "Veteran"}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {decorator.specialization.slice(0, 3).map((spec, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full capitalize"
                  >
                    {spec}
                  </span>
                ))}
                {decorator.specialization.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    +{decorator.specialization.length - 3}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopDecorators;
