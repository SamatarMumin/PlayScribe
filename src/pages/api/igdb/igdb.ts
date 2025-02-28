import { NextApiRequest, NextApiResponse } from "next";

export default async function goodGamehandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const clientID = process.env.ClientID;
    const auth = process.env.Authorization;

    const response = await fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Client-ID": clientID || "",
        Authorization: auth || "",
      },
      body: "fields name, rating; where rating > 75; limit 3;",
    });

    if (!response.ok) throw new Error("Failed to fetch IGDB data");

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
