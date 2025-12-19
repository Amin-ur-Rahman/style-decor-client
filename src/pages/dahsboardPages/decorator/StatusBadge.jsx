import React from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export const StatusBadge = ({ status, label }) => {
  const isActive = status;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${
        isActive ? "bg-primary/10 text-primary" : "bg-neutral text-text-muted"
      }`}
    >
      {isActive ? <FaCheckCircle size={16} /> : <FaTimesCircle size={16} />}
      {label}
    </span>
  );
};
