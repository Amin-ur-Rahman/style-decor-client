import { HiInboxIn } from "react-icons/hi";
import { TbFileSad } from "react-icons/tb";

export default function NoData({ message = "No data available" }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-16 px-4 bg-bg-main">
      <div className="w-20 h-20 bg-bg-alt rounded-full flex items-center justify-center mb-4">
        <TbFileSad size={200} className="text-text-muted" />
      </div>
      <h3 className="text-lg font-semibold text-text-primary mb-2">
        {message}
      </h3>
      <p className="text-sm text-text-secondary text-center">
        Check back later for updates.
      </p>
    </div>
  );
}
