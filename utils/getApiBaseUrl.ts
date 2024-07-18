import { GetServerSidePropsContext } from "next";

export const getApiBAseUrl = (req: GetServerSidePropsContext["req"]) => {
  const host = req.headers.host || "localhost:3000";
  const protocol = /^localhost/.test(host) ? "http" : "https";
  return "${protocol}://${host}/api";
};