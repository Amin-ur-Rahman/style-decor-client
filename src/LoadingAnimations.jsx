import React from "react";

export const LoadingBubbles = () => {
  return (
    <div className="flex justify-center items-center gap-4 min-h-screen">
      <span className="loading loading-ring loading-xl text-red-500 [--loading-border:6px]"></span>
      <span className="loading loading-ring loading-xl text-blue-500 [--loading-border:6px]"></span>
      <span className="loading loading-ring loading-xl text-green-500 [--loading-border:6px]"></span>
      <span className="loading loading-ring loading-xl text-yellow-500 [--loading-border:6px]"></span>
    </div>
  );
};
