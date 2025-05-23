import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import NavBar from "~/component/navbar";
import UserAvatar from "~/component/useravatar";



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

  const [gameData, setGameData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        fetchGames(searchQuery);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const fetchGames = async (query: string) => {
    try {
      const res = await fetch("/api/igdb/logGame", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gameName: query }),
      });
      
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      
      if (Array.isArray(data) && data.length > 0) {
        setGameData(data);
        console.log("Game data received:", data);
      } else {
        console.log("No game data received or invalid format:", data);
        setGameData([]);
      }
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  useEffect(() => {
    fetchGames("");
  }, []);

  // FIX ID BUG
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
   
    console.log("Title before submission:", title); // Debugging line to check title value

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
                onChange={handleTitleChange}
                className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none"
                placeholder="Type to search for games..."
              />
              {gameData.length > 0 && searchQuery && (
                <div className="mt-2 bg-gray-700 rounded-md max-h-60 overflow-y-auto">
                  {gameData.map((game) => (
                    <div 
                      key={game.id || game.name} 
                      className="p-2 hover:bg-gray-600 cursor-pointer"
                      onClick={() => {
                        setTitle(game.name);
                        setSearchQuery("");
                      }}
                    >
                      {game.name}
                    </div>
                  ))}
                </div>
              )}
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