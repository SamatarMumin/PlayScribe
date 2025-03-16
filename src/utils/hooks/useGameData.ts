import { useState, useEffect } from 'react';

interface GameData {
  id: string;
  name: string;
  rating?: number;
  // Add other properties as needed
}

interface CoverData {
  [key: string]: string;
}

export function useGameData() {
  const [gameData, setGameData] = useState<GameData[]>([]);
  const [cover, setCover] = useState<CoverData>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCriticalGames = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/igdb/igdb");
      if (!res.ok) throw new Error("Failed to fetch games");

      const data = await res.json();
      setGameData(data);
      
      // Fetch covers for each game
      data.forEach(async (game: GameData) => {
        try {
          const coverRes = await fetch("/api/igdb/cover", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: game.id }),
          });
          
          if (!coverRes.ok) throw new Error("Failed to fetch cover");
          
          const screenshotData = await coverRes.json();
          setCover((prev) => ({
            ...prev,
            [game.id]: screenshotData?.[0]?.url || "",
          }));
        } catch (coverError) {
          console.error(`Error fetching cover for game ${game.id}:`, coverError);
        }
      });
    } catch (error) {
      console.error("Error fetching games:", error);
      setError(error instanceof Error ? error.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCriticalGames();
  }, []);

  return { gameData, cover, loading, error, refetch: fetchCriticalGames };
} 