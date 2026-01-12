import { HiPencil, HiCamera } from "react-icons/hi";
import useUserInfo from "../../hooks and contexts/role/useUserInfo";
import { LoadingBubbles } from "../../LoadingAnimations";

const MyProfile = () => {
  const { userData: user, infoLoading } = useUserInfo();

  if (infoLoading) return <LoadingBubbles></LoadingBubbles>;

  return (
    <div className="w-[90dvw] bg-bg-main mx-auto py-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-text-primary mb-8">Profile</h1>

      <div className="bg-bg-main rounded-lg border border-neutral p-8">
        <div className="flex items-start justify-between mb-8 pb-8 border-b border-neutral">
          <div className="flex items-center gap-6">
            <div className="relative">
              <img
                src={user.photoUrl}
                alt={user.userName}
                className="w-24 h-24 rounded-full object-cover"
              />
              {/* <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-gray-800 hover:bg-gray-700 text-text-primary rounded-full flex items-center justify-center transition-all">
                <HiCamera className="w-4 h-4" />
              </button> */}
            </div>

            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-1">
                {user.userName}
              </h2>
              <p className="text-text-primary">{user.userEmail}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs px-2 py-1 bg-bg-main text-text-primary rounded capitalize">
                  {user.role}
                </span>
                <span className=" px-2 py-1 font-semibold text-xs text-green-700 rounded capitalize">
                  {user.status}
                </span>
              </div>
            </div>
          </div>

          {/* <button className="px-4 py-2 border border-gray-300 hover:border-gray-400 text-text-primary rounded-lg flex items-center gap-2 transition-all">
            <HiPencil className="w-4 h-4" />
            Edit
          </button> */}
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-sm text-text-primary mb-1">Name</p>
            <p className="text-text-primary">{user.userName}</p>
          </div>

          <div>
            <p className="text-sm text-text-primary mb-1">Email</p>
            <p className="text-text-primary">{user.userEmail}</p>
          </div>

          <div>
            <p className="text-sm text-text-primary mb-1">User ID</p>
            <p className="text-sm text-text-primary font-mono">{user._id}</p>
          </div>

          <div>
            <p className="text-sm text-text-primary mb-1">Member since</p>
            <p className="text-text-primary">
              {new Date(user.createAt).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
