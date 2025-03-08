import { NextApiRequest, NextApiResponse } from "next";

export default async function Gameloghandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const clientID = process.env.ClientID;
    const auth = process.env.Authorization;
    const gameSearched = req.body?.gameName || "";

    if (!clientID || !auth) {
      return res.status(500).json({ error: "Missing ClientID or Authorization in environment variables" });
    }

    const queryBody = `fields name, release_dates.human; search "${gameSearched}"; limit 10;`;

    const response = await fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Client-ID": clientID,
        Authorization: auth,
      },
      body: queryBody,
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`Failed to fetch IGDB data: ${errorDetails}`);
    }

    const data = await response.json();
    console.log(data);
    res.status(200).json(data);
  } catch (error: any) {
    console.error("Error fetching IGDB data:", error);
    res.status(500).json({ error: error.message || "Failed to fetch data" });
  }
}
