import { HiInboxIn } from "react-icons/hi";

export default function NoData({ message = "No data available" }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-4">
        <HiInboxIn className="w-10 h-10 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-700 mb-2">{message}</h3>
      <p className="text-sm text-gray-500 text-center">
        Check back later for updates.
      </p>
    </div>
  );
}
