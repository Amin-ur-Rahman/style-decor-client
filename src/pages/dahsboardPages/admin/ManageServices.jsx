import {
  HiEye,
  HiPencil,
  HiTrash,
  HiUserAdd,
  HiPlus,
  HiSearch,
  HiX,
} from "react-icons/hi";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosInstance from "../../../hooks and contexts/axios/useAxiosInstance";
import { LoadingBubbles } from "../../../LoadingAnimations";
import { useState, useMemo } from "react";
import { EditServiceModal } from "./EditServiceModal";
import Swal from "sweetalert2";

const ManageServices = () => {
  const axiosInstance = useAxiosInstance();
  const [selectedService, setSelectedService] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const {
    data: services,
    isLoading,
    refetch: serviceRefetch,
  } = useQuery({
    queryKey: ["services-admin"],
    queryFn: async () => {
      const res = await axiosInstance.get("/services");
      return res.data;
    },
  });

  // Filter services based on search query
  const filteredServices = useMemo(() => {
    if (!services) return [];
    if (!searchQuery.trim()) return services;

    const query = searchQuery.toLowerCase();
    return services.filter((service) => {
      return (
        service.serviceName?.toLowerCase().includes(query) ||
        service.category?.toLowerCase().includes(query) ||
        service.createdByEmail?.toLowerCase().includes(query) ||
        service.createdByName?.toLowerCase().includes(query)
      );
    });
  }, [services, searchQuery]);

  if (isLoading) return <LoadingBubbles></LoadingBubbles>;

  const handleEdit = (item) => {
    const service = services.find((s) => s._id === item?._id);
    setSelectedService(service);
    setTimeout(() => {
      setIsEditModalOpen(true);
    }, 200);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Confirm delete?",
      text: "Data will be Deleted permanently from database",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff0000",
      cancelButtonColor: "#808080",
      confirmButtonText: "Delete",
    });
    try {
      if (!result.isConfirmed) return;
      const res = await axiosInstance.delete(`/service/${id}`);
      await Swal.fire({
        title: "Deleted!",
        text: "Service data Deleted permanently",
        icon: "success",
      });
      serviceRefetch();
      console.log(res.data);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to update service.",
        icon: "error",
      });
      console.log(error);
    }
  };

  const handleSearch = () => {
    setSearchQuery(searchInput);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setSearchQuery("");
  };

  return (
    <div className="w-full mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-light text-text-primary mb-2">
          Manage Services & Packages
        </h1>
        <p className="text-sm text-text-muted">
          View, edit, and manage all decoration services
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-6">
        {/* Search input with button */}
        <div className="flex flex-1 max-w-md gap-2">
          <div className="relative flex-1">
            <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full pl-9 pr-9 py-2.5 bg-white border border-neutral rounded-lg focus:outline-none focus:border-primary transition-colors text-sm"
            />
            {searchInput && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
              >
                <HiX className="w-4 h-4" />
              </button>
            )}
          </div>
          <button
            onClick={handleSearch}
            className="px-4 py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-lg transition-colors whitespace-nowrap"
          >
            Search
          </button>
        </div>

        {/* Add new service button */}
        <Link
          to="/add-new-service"
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-colors whitespace-nowrap"
        >
          <HiPlus className="w-4 h-4" />
          Add New Service
        </Link>
      </div>

      {/* Search results info */}
      {searchQuery && (
        <div className="mb-4 flex items-center gap-2">
          <p className="text-sm text-text-secondary">
            Showing {filteredServices.length} result
            {filteredServices.length !== 1 ? "s" : ""} for "
            <span className="font-semibold text-text-primary">
              {searchQuery}
            </span>
            "
          </p>
          <button
            onClick={handleClearSearch}
            className="text-sm text-primary hover:text-primary-hover underline"
          >
            Clear search
          </button>
        </div>
      )}

      {/* Table container with proper overflow handling */}
      <div className="bg-white rounded-lg border border-neutral overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-secondary border-b border-neutral">
              <tr className="text-left">
                <th className="px-3 py-3 text-[11px] font-semibold text-text-secondary uppercase tracking-wide w-12">
                  #
                </th>
                <th className="px-3 py-3 text-[11px] font-semibold text-text-secondary uppercase tracking-wide min-w-[140px]">
                  Service
                </th>
                <th className="px-3 py-3 text-[11px] font-semibold text-text-secondary uppercase tracking-wide min-w-[100px]">
                  Category
                </th>
                <th className="px-3 py-3 text-[11px] font-semibold text-text-secondary uppercase tracking-wide min-w-[80px]">
                  Cost
                </th>
                <th className="px-3 py-3 text-[11px] font-semibold text-text-secondary uppercase tracking-wide min-w-[70px]">
                  Unit
                </th>
                <th className="px-3 py-3 text-[11px] font-semibold text-text-secondary uppercase tracking-wide min-w-[140px]">
                  Created By
                </th>
                <th className="px-3 py-3 text-[11px] font-semibold text-text-secondary uppercase tracking-wide min-w-[90px]">
                  Date
                </th>
                <th className="px-3 py-3 text-[11px] font-semibold text-text-secondary uppercase tracking-wide text-center min-w-[140px]">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-neutral">
              {filteredServices.length > 0 ? (
                filteredServices.map((service, index) => (
                  <tr
                    key={service._id}
                    className="hover:bg-secondary/50 transition-colors"
                  >
                    <td className="px-3 py-3 text-xs text-text-muted">
                      {index + 1}
                    </td>

                    <td className="px-3 py-3 text-xs font-medium text-text-primary">
                      <div className="line-clamp-2">{service.serviceName}</div>
                    </td>

                    <td className="px-3 py-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-medium whitespace-nowrap">
                        {service.category}
                      </span>
                    </td>

                    <td className="px-3 py-3 text-xs font-semibold text-text-primary whitespace-nowrap">
                      ${service.cost}
                    </td>

                    <td className="px-3 py-3 text-xs text-text-secondary">
                      {service.unit}
                    </td>

                    <td className="px-3 py-3 text-xs text-text-secondary">
                      <div
                        className="max-w-[140px] truncate"
                        title={service.createdByEmail}
                      >
                        {service.createdByEmail}
                      </div>
                    </td>

                    <td className="px-3 py-3 text-xs text-text-secondary whitespace-nowrap">
                      {new Date(service.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>

                    <td className="px-3 py-3">
                      <div className="flex items-center justify-center gap-1">
                        <Link
                          to={`/service-details/${service._id}`}
                          className="p-1.5 rounded-md text-text-muted hover:text-primary hover:bg-primary/10 transition-colors"
                          title="View"
                        >
                          <HiEye className="w-4 h-4" />
                        </Link>

                        <button
                          onClick={() => handleEdit(service)}
                          className="p-1.5 rounded-md text-text-muted hover:text-accent hover:bg-accent/10 transition-colors"
                          title="Edit"
                        >
                          <HiPencil className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDelete(service._id)}
                          className="p-1.5 rounded-md text-text-muted hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete"
                        >
                          <HiTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="px-3 py-12 text-center text-text-muted"
                  >
                    {searchQuery
                      ? "No services found matching your search"
                      : "No services available"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 text-xs text-text-muted">
        Showing {filteredServices.length} service
        {filteredServices.length !== 1 ? "s" : ""}
        {searchQuery && ` (filtered from ${services.length} total)`}
      </div>

      <EditServiceModal
        service={selectedService}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </div>
  );
};

export default ManageServices;
