import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import NavBar from "~/component/navbar";
import RecentActivity from "~/component/recentactivity";

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
  const { user } = useUser();
  const [gameData, setGameData] = useState<any[]>([]);
  const [screenshots, setScreenshots] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchCriticalGames = async () => {
      try {
        const res = await fetch("/api/igdb/igdb");
        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        setGameData(data);
        data.forEach(async (game: any) => {
          const screenshotRes = await fetch("/api/igdb/thumbnail", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: game.id }),
          });
          if (screenshotRes.ok) {
            const screenshotData = await screenshotRes.json();
            setScreenshots((prev) => ({
              ...prev,
              [game.id]: screenshotData?.[0]?.url || "", 
            }));
          }
        });
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchCriticalGames();
  }, []);

  console.log(gameData);

  return (
    <div className="h-screen bg-gray-900">
      <div className="">
        <NavBar></NavBar>
      </div>
      <div className="mx-auto flex max-w-7xl rounded-md bg-gray-600 py-6 shadow-md">
        <div className="flex-col px-5">
          <UserAvatar></UserAvatar>
        </div>
        <div className="flex flex-col">
          <h2 className="block font-sans text-3xl font-bold text-white">
            Welcome back, {user?.fullName}
          </h2>
          <text className="text-lg text-gray-400">
            Ready to log your gaming adventures?
          </text>
        </div>
        <div className="ml-auto mr-5 justify-between">
          <h2 className="block text-xl font-semibold text-gray-300">
            Games Logged:
          </h2>
          <p className="text-2xl font-bold text-white">25</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6">
      <h2 className="text-2xl font-bold text-white mb-4">Critically Acclaimed Games</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {gameData.map((game) => (
          <div key={game.id} className="rounded-lg bg-gray-800 shadow-lg overflow-hidden">
            <img
              src={screenshots[game.id] || "/placeholder.jpg"}
              alt={game.name}
              className="h-40 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white">{game.name}</h3>
              <p className="text-yellow-400 font-semibold">⭐ {game.rating?.toFixed(1) || "N/A"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

      <RecentActivity></RecentActivity>
    </div>
  );
}

//{gameData.map(gameD => gameD.name)}
