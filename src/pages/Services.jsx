import React, { useState } from "react";
import useAxiosInstance from "../hooks and contexts/axios/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import NoData from "../components/NoData";
import { LoadingBubbles } from "../LoadingAnimations";
import { HiSearch, HiArrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import { TbCoinTaka } from "react-icons/tb";

const Services = () => {
  const axiosInstance = useAxiosInstance();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");

  const {
    data: services,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await axiosInstance.get("/services");
      return res.data;
    },
  });

  if (isLoading) return <LoadingBubbles></LoadingBubbles>;
  if (isError || !services) return <NoData></NoData>;

  const categories = [...new Set(services.map((s) => s.category))];

  const filteredServices = services.filter((service) => {
    if (
      searchQuery &&
      !service.serviceName.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    if (selectedCategory && service.category !== selectedCategory) {
      return false;
    }

    const serviceCost = service.cost;
    if (minBudget && serviceCost < Number(minBudget)) {
      return false;
    }
    if (maxBudget && serviceCost > Number(maxBudget)) {
      return false;
    }

    return true;
  });

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setMinBudget("");
    setMaxBudget("");
  };

  return (
    <div className="min-h-screen bg-bg-main">
      <div className="w-[90dvw] mx-auto py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-text-primary mb-3">
            Our Services
          </h1>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Explore our premium decoration services for every occasion
          </p>
        </div>

        {/* Filters Section */}
        <div className="bg-bg-alt rounded-lg border border-neutral p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-text-primary mb-2">
                Search Services
              </label>
              <div className="relative">
                <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by service name..."
                  className="w-full pl-10 pr-4 py-2.5 bg-bg-main border border-neutral rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder:text-text-secondary/50"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2.5 bg-bg-main border border-neutral rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all capitalize"
              >
                <option value="" className="bg-bg-main text-text-primary">
                  All Categories
                </option>
                {categories.map((cat) => (
                  <option
                    key={cat}
                    value={cat}
                    className="capitalize bg-bg-main text-text-primary"
                  >
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Budget Range */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Budget Range
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={minBudget}
                  onChange={(e) => setMinBudget(e.target.value)}
                  placeholder="Min"
                  className="w-full px-3 py-2.5 bg-bg-main border border-neutral rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder:text-text-secondary/50"
                />
                <input
                  type="number"
                  value={maxBudget}
                  onChange={(e) => setMaxBudget(e.target.value)}
                  placeholder="Max"
                  className="w-full px-3 py-2.5 bg-bg-main border border-neutral rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder:text-text-secondary/50"
                />
              </div>
            </div>
          </div>

          {/* Reset Filters */}
          {(searchQuery || selectedCategory || minBudget || maxBudget) && (
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-text-secondary">
                Showing {filteredServices.length} of {services.length} services
              </p>
              <button
                onClick={handleResetFilters}
                className="text-sm text-primary hover:text-primary/80 font-medium transition-colors underline decoration-primary/30"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Services Grid */}
        {filteredServices.length === 0 ? (
          <div className="bg-bg-alt rounded-lg border border-neutral p-12 text-center">
            <p className="text-text-secondary">
              No services match your search criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <div
                key={service._id}
                className="group bg-bg-alt rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-neutral"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={service.photo}
                    alt={service.serviceName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-bg-main/90 backdrop-blur-sm text-primary font-semibold rounded-full text-xs shadow-sm capitalize border border-neutral">
                      {service.category}
                    </span>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-alt via-bg-alt/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-text-primary text-xl font-semibold mb-3">
                        {service.serviceName}
                      </h3>
                      <Link
                        to={`/service-details/${service._id}`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white text-sm font-medium rounded-lg transition-all shadow-lg shadow-primary/20"
                      >
                        View Details
                        <HiArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-text-primary mb-2 line-clamp-1">
                    {service.serviceName}
                  </h3>

                  <p className="text-sm text-text-secondary mb-4 line-clamp-2">
                    {service.shortDescription}
                  </p>

                  {/* Price & Unit */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xl font-bold flex items-center gap-1 text-accent">
                        <TbCoinTaka className="text-2xl" />
                        {service.cost}
                      </p>
                      <p className="text-xs text-text-secondary/70 capitalize">
                        {service.unit}
                      </p>
                    </div>
                    <span className="text-xs px-2 py-1 bg-secondary text-primary rounded capitalize font-medium border border-primary/10">
                      {service.rateType.replace("-", " ")}
                    </span>
                  </div>

                  {/* Added By */}
                  <div className="mt-4 pt-4 border-t border-neutral">
                    <p className="text-xs text-text-secondary/70">
                      Added by{" "}
                      <span className="text-text-primary font-medium">
                        {service.createdByName}
                      </span>
                    </p>
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

export default Services;
