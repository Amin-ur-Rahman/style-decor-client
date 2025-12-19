import React from "react";
import useAxiosInstance from "../../hooks and contexts/axios/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import { LoadingBubbles } from "../../LoadingAnimations";
import NoData from "../NoData";
import { HiArrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";

const DynamicServices = () => {
  const axiosInstance = useAxiosInstance();

  const {
    data: allServices,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["services-home"],
    queryFn: async () => {
      const res = await axiosInstance.get("/services");
      return res.data;
    },
  });

  if (isLoading) return <LoadingBubbles></LoadingBubbles>;

  const services = allServices?.slice(0, 6);
  console.log(services);
  if (!services || isError) return <NoData></NoData>;

  return (
    <div>
      <section className="w-[90dvw] mx-auto py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Our Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our premium decoration services tailored to make your
            spaces extraordinary
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services?.map((service) => (
            <div
              key={service._id}
              className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-neutral"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={service.photo}
                  alt={service.serviceName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                <div
                  className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent 
                opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
                >
                  <div
                    className="absolute bottom-0 left-0 right-0 p-6
                translate-y-0 md:translate-y-2 md:group-hover:translate-y-0
                transition-transform duration-300"
                  >
                    <h3 className="text-white text-xl font-semibold mb-3">
                      {service.serviceName}
                    </h3>
                    <Link
                      to={`/service-details/${service._id}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white text-sm font-medium rounded-lg transition-all"
                    >
                      View Details
                      <HiArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="p-4 flex justify-between">
                <p className="text-sm text-gray-500">
                  Added by:{" "}
                  <span className="text-gray-700 font-medium">
                    {service.createdByName}
                  </span>
                </p>
                <p className="text-sm text-gray-500">
                  Category:{" "}
                  <span className="text-gray-700 font-medium">
                    {service.category}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center my-5 lg:my-10">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-primary/90 text-white text-sm font-medium rounded-lg transition-all hover:scale-105"
          >
            Browse All Our Services
            <HiArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default DynamicServices;
