import React from "react";
import useAxiosInstance from "../../hooks and contexts/axios/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import { LoadingBubbles } from "../../LoadingAnimations";
import NoData from "../NoData";
import {
  HiLocationMarker,
  HiCheckCircle,
  HiXCircle,
  HiStar,
  HiBriefcase,
} from "react-icons/hi";

const AvailableDecoratorsModal = ({ service }) => {
  const axiosInstance = useAxiosInstance();

  const { data: decoratorsAvailableData, isLoading } = useQuery({
    queryKey: ["decorators-data-for-users"],
    queryFn: async () => {
      const res = await axiosInstance.get("/decorators/availability");
      return res.data;
    },
  });

  if (isLoading) return <LoadingBubbles />;
  if (!decoratorsAvailableData) return <NoData />;

  const sortedDecorators = decoratorsAvailableData.filter((d) =>
    d.specialization.includes(service.category)
  );

  return (
    <div className="bg-bg-main rounded-lg max-h-[85vh] flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-bg-main border-b border-neutral px-4 sm:px-6 py-4 rounded-t-lg">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
            Available Decorators
          </h2>
          <p className="text-sm text-text-muted mt-1">
            {service.category && (
              <span className="capitalize font-medium text-primary">
                {service.category}
              </span>
            )}{" "}
            specialists • {sortedDecorators.length} found
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="overflow-y-auto flex-1 px-4 sm:px-6 py-4">
        {sortedDecorators.length === 0 ? (
          <div className="text-center py-12 px-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral mb-4">
              <HiBriefcase className="w-8 h-8 text-text-muted" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              No Decorators Available
            </h3>
            <p className="text-text-muted max-w-md mx-auto">
              No specialized decorators are currently available for{" "}
              <span className="capitalize font-medium">{service.category}</span>{" "}
              services. Please check back later.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedDecorators.map((decorator) => (
              <div
                key={decorator._id}
                className="bg-bg-alt border border-neutral rounded-xl p-4 sm:p-5 hover:shadow-lg hover:border-primary/30 transition-all duration-300"
              >
                {/* Header Section */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                      <h3 className="text-lg sm:text-xl font-bold text-text-primary capitalize">
                        {decorator.decoratorName}
                      </h3>
                      {decorator.isAvailable ? (
                        <span className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 text-green-400 text-xs font-semibold rounded-full w-fit border border-green-500/30 shadow-sm">
                          <HiCheckCircle className="w-4 h-4" />
                          Available Now
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 text-red-400 text-xs font-semibold rounded-full w-fit border border-red-500/30">
                          <HiXCircle className="w-4 h-4" />
                          Currently Busy
                        </span>
                      )}
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                      <HiLocationMarker className="w-4 h-4 text-accent flex-shrink-0" />
                      <span className="font-medium">
                        {decorator.serviceLocation.area},{" "}
                        {decorator.serviceLocation.city}
                      </span>
                    </div>
                  </div>

                  {/* Rating placeholder - can be connected to actual data */}
                  <div className="hidden sm:flex items-center gap-1 bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
                    <HiStar className="w-4 h-4 text-primary fill-current" />
                    <span className="text-sm font-semibold text-primary">
                      {decorator.rating || "New"}
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-neutral my-4"></div>

                {/* Specializations */}
                <div>
                  <p className="text-xs uppercase tracking-wide text-text-muted mb-3 font-semibold flex items-center gap-2">
                    <HiBriefcase className="w-3.5 h-3.5" />
                    Specializations
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {decorator.specialization.map((spec, idx) => (
                      <span
                        key={idx}
                        className={`px-3 sm:px-4 py-1.5 text-xs font-semibold rounded-full capitalize transition-all duration-200 ${
                          spec === service.category
                            ? "bg-primary text-white border-2 border-primary shadow-md scale-105"
                            : "bg-neutral text-text-secondary border border-neutral-dark hover:bg-neutral-dark hover:border-text-muted"
                        }`}
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailableDecoratorsModal;
