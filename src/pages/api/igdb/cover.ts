import { NextApiRequest, NextApiResponse } from "next";

export default async function coverandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const clientID = process.env.ClientID;
    const auth = process.env.Authorization;
    const { id } = req.body; 

    const response = await fetch("https://api.igdb.com/v4/covers", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Client-ID": clientID || "",
        Authorization: auth || "",
      },
      body: `fields alpha_channel,animated,checksum,game,height,image_id,url,width; where game = ${id}; limit 1;`
    });

    if (!response.ok) throw new Error("Failed to fetch IGDB data");

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
