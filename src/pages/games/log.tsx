import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";
import NavBar from "~/component/navbar";
import UserAvatar from "~/component/useravatar";
import { useGameData } from "~/utils/hooks/useGameData";
import { useState, useEffect } from "react";

export default function HomePage() {
  const { data, refetch } = api.games.getAll.useQuery();
  const deleteGamePost = api.games.deleteGame.useMutation();
  const { user } = useUser();

  // Create a separate state for game covers by ID
  const [gameCovers, setGameCovers] = useState<{ [id: string]: string }>({});

  // Fetch covers for each game in the log
  useEffect(() => {
    if (data) {
      data.forEach(async (item) => {
        try {
          // First search for the game by title to get the correct IGDB ID
          const searchRes = await fetch("/api/igdb/logGame", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ gameName: item.game.title }),
          });
          
          if (!searchRes.ok) {
            throw new Error(`Failed to search for game: ${item.game.title}`);
          }
          
          const searchData = await searchRes.json();
          
          // If we found a match, use its ID to fetch the cover
          if (searchData && searchData.length > 0) {
            const igdbId = searchData[0].id;
            
            const coverRes = await fetch("/api/igdb/cover", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id: igdbId }),
            });
            
            if (coverRes.ok) {
              const coverData = await coverRes.json();
              if (coverData && coverData.length > 0) {
                setGameCovers(prev => ({
                  ...prev,
                  [item.game.id]: coverData[0].url || "",
                }));
              } else {
                console.log(`No cover found for game: ${item.game.title}`);
              }
            } else {
              const errorText = await coverRes.text();
              console.error(`Cover API error for ${item.game.title}:`, errorText);
            }
          } else {
            console.log(`No IGDB match found for game: ${item.game.title}`);
          }
        } catch (error) {
          console.error(`Error fetching cover for game ${item.game.id}:`, error);
        }
      });
    }
  }, [data]);

  const deleteGame = async (gameID: string) => {
    try {
      await deleteGamePost.mutateAsync({
        id: gameID,
        status: false,
        authorID: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        title: "",
        starRating: 0,
        reviewDesc: "",
      });
      await refetch();
    } catch (error) {
      console.error("Error deleting game:", error);
    }
  };

  return (
    <div className="h-screen bg-gray-900">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold text-white">Your Gaming Log</h1>
        
        {!data?.length && (
          <div className="rounded-lg bg-gray-800 p-8 text-center text-white">
            <p className="text-xl">No games logged yet.</p>
            <Link href="/games/create" className="mt-4 inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700">
              Log Your First Game
            </Link>
          </div>
        )}
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data?.map((item) => (
            <div key={item.game.id} className="overflow-hidden rounded-lg bg-gray-800 shadow-lg">
              <div className="relative h-48 overflow-hidden">
                <img
                  loading="lazy"
                  src={gameCovers[item.game.id] || "https://via.placeholder.com/320x480?text=No+Image+Available"}
                  alt={item.game.title}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/320x480?text=No+Image+Available";
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                  <div className="text-yellow-400">★ {item.game.starRating}/5</div>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="mb-2 text-xl font-semibold text-white">{item.game.title}</h3>
                <p className="mb-4 text-gray-300">{item.game.reviewDesc}</p>
                
                <div className="mt-4 space-y-1 text-sm text-gray-400">
                  <p>Logged on {new Date(item.game.createdAt).toLocaleDateString()}</p>
                </div>
                
                {item.game.authorID === user?.id && (
                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={() => void deleteGame(item.game.id)}
                      className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
