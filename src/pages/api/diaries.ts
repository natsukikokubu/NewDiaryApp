import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../utils/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.method);
  if (req.method === "GET") {
    const data = await supabase.from("diaries").select("*");
    res.status(200).json(data);
  } else if (req.method === "POST") {
    const { title, content } = req.body;
    console.log(title, content);

    if (!title || !content) {
      return res.status(400).end("タイトル、内容は必須です");
    }
    try {
      const data = await supabase.from("diaries").insert([
        {
          title,
          content,
          date: "2021-09-01",
          updatedAt: new Date().toISOString(),
        },
      ]);

      console.log(data);
    } catch (e) {
      console.error(e);
      return res.status(500).end("Internal Server Error");
    }

    res.status(201).end();
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
