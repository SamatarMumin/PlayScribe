import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import NavBar from "~/component/navbar";

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

// Main Component
export default function GamesPage() {
  const createGamePost = api.games.createGame.useMutation();

  // Form states
  const [status, setStatus] = useState(false);
  const [id, setId] = useState("");
  const [authorID, setAuthorID] = useState("");
  const [reviewDesc, setReviewDesc] = useState("");
  const [title, setTitle] = useState("");
  const [starRating, setStarRating] = useState(0);
  const {user} = useUser();

  // FIX ID BUG
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
   
    try {
      await createGamePost.mutateAsync({
        status,
        id:(Math.random() + 1).toString(36),
        authorID: user?.id || "no name idk", // Need to take username from clerk and populate
        createdAt: new Date(),
        updatedAt: new Date(),
        title,
        reviewDesc,
        starRating,
      });

      console.log(id)

      // Reset form fields
      setStatus(false);
      setId((Math.random() + 1).toString(36));
      setAuthorID("");
      setTitle("");
      setStarRating(0);
      setReviewDesc("");
    } catch (error) {
      console.error("Error creating game:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <NavBar />
      <div className="mt-10 flex flex-col items-center">
        <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
          <UserAvatar />
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Game Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm">Review</label>
              <textarea
                value={reviewDesc}
                onChange={(e) => setReviewDesc(e.target.value)}
                className="w-full rounded-md bg-gray-700 text-white focus:outline-none"
                rows={4}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Stars</label>
              <input
                type="number"
                value={starRating}
                onChange={(e) => setStarRating(Number(e.target.value))}
                max={5}
                className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-red-500 hover:bg-red-600 rounded-md text-white font-semibold"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}