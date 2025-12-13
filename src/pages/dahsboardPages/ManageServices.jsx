import {
  HiEye,
  HiPencil,
  HiTrash,
  HiUserAdd,
  HiPlus,
  HiSearch,
} from "react-icons/hi";
import useAxiosInstance from "../../hooks and contexts/axios/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import { LoadingBubbles } from "../../LoadingAnimations";
import { Link } from "react-router-dom";

const ManageServices = () => {
  const axiosInstance = useAxiosInstance();

  const { data: services, isLoading } = useQuery({
    queryKey: ["services-admin"],
    queryFn: async () => {
      const res = await axiosInstance.get("/services");
      return res.data;
    },
  });

  if (isLoading) return <LoadingBubbles></LoadingBubbles>;

  const handleView = (id) => {
    console.log(id);
  };

  const handleEdit = (id) => {
    console.log(id);
  };

  const handleDelete = (id) => {
    console.log(id);
  };

  const handleAssignDecorator = (id) => {
    console.log(id);
  };

  const handleAddNew = () => {
    console.log("new service added");
  };

  return (
    <div className="w-[90dvw] mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Manage Services & Packages
        </h1>
        <p className="text-gray-600">
          View, edit, and manage all decoration services
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        {/* ---------search input--------------- */}
        <div className="relative w-full sm:w-96">
          <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search services..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm"
          />
        </div>

        {/* -------------add new service button-------------- */}
        <Link
          to="/add-new-service"
          onClick={handleAddNew}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-all shadow-sm hover:shadow-md whitespace-nowrap"
        >
          <HiPlus className="w-5 h-5" />
          Add New Service
        </Link>
      </div>

      {/* -----------table container----------------- */}
      <div className="bg-white rounded-lg border border-neutral shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary">
              <tr>
                <th></th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Service Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Cost
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Unit
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Created By
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral">
              {services.map((service, index) => (
                <tr
                  key={service._id}
                  className="hover:bg-secondary/50 transition-colors"
                >
                  <th className="px-6">{index + 1}</th>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">
                    {service.serviceName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                      {service.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                    ${service.cost}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {service.unit}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {service.createdByEmail}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(service.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      {/* ------------details button-------- */}
                      <Link
                        to={`/service-details/${service._id}`}
                        className="group relative p-2 text-gray-600 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                        title="View Details"
                      >
                        <HiEye className="w-5 h-5" />
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                          View
                        </span>
                      </Link>

                      {/* ----------------edit button------------- */}
                      <button
                        onClick={() => handleEdit(service._id)}
                        className="group relative p-2 text-gray-600 hover:text-accent hover:bg-accent/10 rounded-lg transition-all"
                        title="Edit Service"
                      >
                        <HiPencil className="w-5 h-5" />
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                          Edit
                        </span>
                      </button>

                      {/* assign decorator button ----------------------- */}
                      <button
                        onClick={() => handleAssignDecorator(service._id)}
                        className="group relative p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"
                        title="Assign Decorator"
                      >
                        <HiUserAdd className="w-5 h-5" />
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                          Assign Decorator
                        </span>
                      </button>

                      {/* ---------------delete button---------------- */}
                      <button
                        onClick={() => handleDelete(service._id)}
                        className="group relative p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete Service"
                      >
                        <HiTrash className="w-5 h-5" />
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                          Delete
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        Showing {services.length} services
      </div>
    </div>
  );
};

export default ManageServices;
