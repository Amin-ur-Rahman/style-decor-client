import React from "react";
import useAxiosInstance from "../../hooks and contexts/axios/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import { LoadingBubbles } from "../../LoadingAnimations";
import NoData from "../NoData";
import { HiLocationMarker, HiCheckCircle, HiXCircle } from "react-icons/hi";

const AvailableDecoratorsModal = ({ service }) => {
  const axiosInstance = useAxiosInstance();

  const { data: decoratorsAvailableData, isLoading } = useQuery({
    queryKey: ["decorators-data-for-users"],
    queryFn: async () => {
      const res = await axiosInstance.get("/decorators/availability");
      return res.data;
    },
  });

  if (isLoading) return <LoadingBubbles></LoadingBubbles>;
  if (!decoratorsAvailableData) return <NoData></NoData>;

  const sortedDecorators = decoratorsAvailableData.filter((d) =>
    d.specialization.includes(service.category)
  );

  return (
    <>
      {sortedDecorators.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">
            No specialized decorators available for this service category
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedDecorators.map((decorator) => (
            <div
              key={decorator._id}
              className="bg-white border border-neutral rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                {/* Decorator Info */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 capitalize">
                      {decorator.decoratorName}
                    </h3>
                    {decorator.isAvailable ? (
                      <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full w-fit">
                        <HiCheckCircle className="w-3.5 h-3.5" />
                        Available
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full w-fit">
                        <HiXCircle className="w-3.5 h-3.5" />
                        Unavailable
                      </span>
                    )}
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                    <HiLocationMarker className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span>
                      {decorator.serviceLocation.area},{" "}
                      {decorator.serviceLocation.city}
                    </span>
                  </div>

                  {/* Specializations */}
                  <div>
                    <p className="text-xs text-gray-500 mb-2">
                      Specializations:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {decorator.specialization.map((spec, idx) => (
                        <span
                          key={idx}
                          className={`px-2 sm:px-3 py-1 text-xs font-medium rounded-full capitalize ${
                            spec === service.category
                              ? "bg-primary/20 text-primary border border-primary/30"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default AvailableDecoratorsModal;
