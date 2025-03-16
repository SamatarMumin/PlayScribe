import { useUser } from "@clerk/nextjs";

export default function UserAvatar() {
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
 
}