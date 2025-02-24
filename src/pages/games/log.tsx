import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import NavBar from "~/component/navbar";

export default function HomePage() {
  const { data, refetch } = api.games.getAll.useQuery();
  const deleteGamePost = api.games.deleteGame.useMutation();

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
            reviewDesc: ""
        }); 
        await refetch(); 
    } catch (error) {
        console.error("Error deleting game:", error);
    }
};



  const showGames = () => {
    const { user } = useUser();
        return data?.map((gameData) => (
      <div
        key={gameData.game.id}
        className="max-w-sm mx-auto bg-white p-4 rounded-lg shadow-lg mb-6"
      >
        <div className="text-xl font-semibold mb-2">{gameData.game.title}</div>
        <div className="text-gray-700 mb-4">{gameData.game.reviewDesc}</div>
        <div className="text-sm text-gray-500">Created: {new Date(gameData.game.createdAt).toLocaleDateString()}</div>
        <div className="text-sm text-gray-500">Updated: {new Date(gameData.game.updatedAt).toLocaleDateString()}</div>
        <div className="text-sm text-gray-500">Status: {gameData.game.status ? "Active" : "Inactive"}</div>
        <div className="text-sm text-gray-500">Rating: {gameData.game.starRating} / 5</div>

        {gameData.game.authorID == user?.id &&
           <div className="py-6">
           <button
             type="button"
             onClick={() => void deleteGame(gameData.game.id)}
             className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
           >
             Delete
           </button>
         </div>
        }
     
      </div>
    ));
  };

  return (
    <div className="h-screen bg-gray-900">
      <NavBar />
      <div className="flex flex-wrap justify-center p-4">{showGames()}</div>
    </div>
  );
}
