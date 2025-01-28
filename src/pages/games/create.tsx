
import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import NavBar from "~/component/navbar";

// User Avatar Component
const UserAvatar = () => {
  const { user } = useUser();
  if (!user) return null;

  return (
    <div className="flex">
      <img
        src={user.profileImageUrl}
        alt="Profile Image"
        className="h-16 w-16 rounded-full object-left-top"
      />
    </div>
  );
};

// Main Component
export default function GamesPage() {
  const createGamePost = api.games.createGame.useMutation();

  // Form states
  const [status, setStatus] = useState(false);
  const [id, setId] = useState("");
  const [authorID, setAuthorID] = useState("");
  const [reviewDesc, setreviewDesc] = useState("");
  const [title, setTitle] = useState("");
  const [starRating, setStarRating] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createGamePost.mutateAsync({
        status,
        id,
        authorID,
        createdAt: new Date(),
        updatedAt: new Date(),
        title,
        reviewDesc,
        starRating,
      });

      // Reset form fields
      setStatus(false);
      setId((Math.random() + 1).toString(36));
      setAuthorID("");
      setTitle("");
      setStarRating(0);
      setreviewDesc("")
    } catch (error) {
      console.error("Error creating game:", error);
    }
  };

  return (
    <div>
      <NavBar></NavBar>
    <div className="mt-8 space-y-6 bg-black sm:mx-auto sm:max-w-md">
  
      <UserAvatar />
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-white">Game Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2"
          />
        </div>
        <div>
          <label className="block text-white">Review</label>
          <input
            type="text"
            value={reviewDesc}
            onChange={(e) => setreviewDesc(e.target.value)}
            className="w-full p-2"
          />
        </div>
        <div>
          <label className="block text-white">Stars</label>
          <input
            type="number"
            value={starRating}
            onChange={(e) => setStarRating(Number(e.target.value))}
            max={5}
            className="w-full p-2"
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-red-500 text-white">
          Submit
        </button>
      </form>
    </div>
    </div>
  );
}
