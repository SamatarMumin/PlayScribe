import { NextApiRequest, NextApiResponse } from "next";

export default async function coverandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const clientID = process.env.ClientID;
    const auth = process.env.Authorization;

    const { id, name } = req.body;
    let queryBody = "";
    
    if (id) {
      queryBody = `fields alpha_channel,animated,checksum,game,height,image_id,url,width; where game = ${id}; limit 1;`;
    } else if (name) {
      queryBody = `fields alpha_channel,animated,checksum,game,height,image_id,url,width; where game.name = "${name}"; limit 1;`;
    } else {
      throw new Error("Either id or name must be provided");
    }

    const response = await fetch("https://api.igdb.com/v4/covers", {
      method: "POST", 
      headers: {
        Accept: "application/json",
        "Client-ID": clientID || "",
        Authorization: auth || "",
      },
      body: queryBody
    });

    if (!response.ok) throw new Error("Failed to fetch IGDB data");

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
