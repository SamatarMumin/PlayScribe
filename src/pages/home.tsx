import { useUser } from "@clerk/nextjs";
import NavBar from "~/component/navbar";
import RecentActivity from "~/component/recentactivity";
import UserAvatar from "~/component/useravatar";
import { useGameData } from "~/utils/hooks/useGameData";

export default function homePage() {
  const { user } = useUser();
  const { gameData, cover, loading, error } = useGameData();

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
        
        {loading && (
          <div className="text-white text-center py-10">Loading games...</div>
        )}
        
        {error && (
          <div className="text-red-500 text-center py-10">Error: {error}</div>
        )}
        
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {gameData.map((game) => (
              <div key={game.id} className="rounded-lg bg-gray-800 shadow-lg overflow-hidden">
                <img
                  loading="lazy"
                  src={cover[game.id] || "/placeholder.jpg"}
                  alt={game.name}
                  className="h-56 w-full object-cover transition-transform hover:scale-105 duration-300"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/320x480?text=No+Image+Available";
                  }}
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white">{game.name}</h3>
                  <p className="text-yellow-400 font-semibold">⭐ {game.rating?.toFixed(1) || "N/A"}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <RecentActivity></RecentActivity>
    </div>
  );
}

//{gameData.map(gameD => gameD.name)}
