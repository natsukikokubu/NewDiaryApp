import { supabase } from "../../../../utils/supabase";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const supabaseRes = await supabase
      .from("diaries")
      .select("*")
      .eq("id", req.query.id);
    if (Array.isArray(supabaseRes.data)) {
      res.status(200).json(supabaseRes.data[0]);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } else if (req.method === "PUT") {
    const { title, content, date } = req.body;
    await supabase
      .from("diaries")
      .update({ title, content, date })
      .eq("id", req.query.id);
    res.status(200).json({ message: "Updated" });
  } else if (req.method === "DELETE") {
    await supabase.from("diaries").delete().eq("id", req.query.id);
    res.status(200).json({ message: "Deleted" });
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
