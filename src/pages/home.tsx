import { useUser } from "@clerk/nextjs";
import NavBar from "~/component/navbar";

export default function homePage() {

// User Avatar Component
const UserAvatar = () => {
  const { user } = useUser();
  if (!user) return null;

  return (
    <div className="flex justify-center">
      <img
        src={user.profileImageUrl}
        alt="Profile Image"
        className="h-16 w-16 rounded-full object-cover shadow-md"
      />
    </div>
  );
};
 const {user} = useUser();
  return (
    <div className="h-screen bg-gray-800">
      <div className="">
        <NavBar></NavBar>
      </div>
      <div className="max-w-7xl mx-auto flex rounded-md bg-gray-600 py-8 shadow-md">
        <div className="px-5 flex-col"><UserAvatar></UserAvatar></div>
        <div className="flex flex-col">
        <h2 className="block font-bold text-white text-3xl font-sans">Welcome back, {user?.fullName}</h2>
        <text className="text-gray-400 text-lg">Ready to log your gaming adventures?</text>
        </div>
        <div className="ml-auto justify-between mr-5">
          <h2 className="block text-gray-300 text-xl font-semibold">Games Logged:</h2>
          <p className="text-white text-2xl font-bold">25</p>
        </div>
      </div>
    </div>
  );
}
